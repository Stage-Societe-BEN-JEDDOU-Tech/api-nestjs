import { generate } from "otp-generator";
import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { MailService } from "./mailer.service";
import { PrismaService } from "./prisma.service";

@Injectable()
export class OtpSerive{
    constructor(private readonly mailer: MailService,
        private readonly prisma: PrismaService){}

    private generateOtp(){
        return generate(4, {upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false});
    }

    async sendOtp({email}: {email: string}){
        const otp = this.generateOtp();

        const existQueue = await this.prisma.queueOtp.findUnique({
            where: {email}
        })
        const existUser = await this.prisma.user.findFirst({
            where: {email}
        })

        if (existUser) throw new ConflictException()

        if (existQueue) {
            await this.prisma.queueOtp.delete({
                where: existQueue
            })
        }

        try {
            await this.prisma.queueOtp.create({
                data: {otp, email}
            })
            return await this.mailer.sendOtp({otp, email});
        } catch (error) {
            await this.prisma.queueOtp.delete({
                where: {email}
            })
            throw new InternalServerErrorException('good trying')
        }
        
    }

    async verifyOtp({email, otp}: {email: string, otp: string}){
        const queueOtp = await this.prisma.queueOtp.findUnique({
            where: {email, otp}
        })
        if (!queueOtp) {
            throw new ForbiddenException({
                message: "code unverifed"
            })
        }
        
        await this.prisma.queueOtp.delete({
            where: queueOtp
        })

        return {
            error: false,
            message: 'Verfication succesfully !'
        }
    }
}