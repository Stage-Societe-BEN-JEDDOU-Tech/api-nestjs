import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotImplementedException } from "@nestjs/common";
import { createId } from "@paralleldrive/cuid2";
import { generate } from "otp-generator";
import { MailService } from "src/mailer.service";
import { PrismaService } from "src/prisma.service"

@Injectable()
export class CodeReset{

    constructor(private readonly prisma: PrismaService, private readonly mailer: MailService){}

    async askReset({id}: {id: string}){
        try {
            const {identity, type} = await this.prisma.user.findUnique({
                where: {id},
                select: {
                    identity: true,
                    type: true,
                }
            })
            return await this.sendCode({identity, type});   
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async verifiyCode(id: string, code: string){
        const {identity} = await this.prisma.user.findUnique({
            where: {id},
            select: {identity: true}
        })

        const queue = await this.prisma.queueOtp.findUnique({
            where: {identity, type: "reset"},
            select: {otp: true}
        })

        if (!queue) throw new ForbiddenException()

        const {otp} = queue

        if (otp !== code) throw new ForbiddenException()

        await this.prisma.queueOtp.delete({
            where: {identity, otp, type: "reset"}
        })

        return {
            error: false,
            message: 'Allowed to reset'
        }
    }

    private async sendCode({identity, type} : {identity: string, type: string}){
        const otp = generate()
        await this.prisma.queueOtp.create({
            data:{
                identity, otp, type: "reset"
            }
        })

        switch (type) {
            case 'mail':
                return this.mailer.sendOtp({otp, identity})
            case 'phone':
                throw new NotImplementedException()
            default:
                break;
        }
    }
}