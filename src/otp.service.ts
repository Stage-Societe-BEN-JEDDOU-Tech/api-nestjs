import { generate } from "otp-generator";
import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotImplementedException } from "@nestjs/common";
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

        if (existQueue) {
            throw new ConflictException()
        }

        try {
            await this.prisma.queueOtp.create({
                data: {otp, email}
            })
            return await this.mailer.sendOtp({otp, email});
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
        
    }

    async verifyOtp({mail, otp}: {mail: string, otp: string}){
        try {
            const queueOtp = await this.prisma.queueOtp.findUnique({
                where: {email, otp}
            })
            if (!queueOtp) {
                throw new ForbiddenException({
                    message: "code unverifed"
                })
            }
            
            // await this.prisma.queueOtp.delete({
            //     where: queueOtp
            // })

            return {
                error: false,
                message: 'Verfication succesfully !'
            }            
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}