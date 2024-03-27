import { generate } from "otp-generator";
import { SendOtpDto } from "./DTO/send-otp.dto";
import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotImplementedException } from "@nestjs/common";
import { MailService } from "./mailer.service";
import { PrismaService } from "./prisma.service";
import { VerifyOtpDto } from "./DTO/verify-otp.dto";
import { SmsService } from "./sms.service";

@Injectable()
export class OtpSerive{
    constructor(private readonly mailer: MailService,
        private readonly smsService: SmsService,
        private readonly prisma: PrismaService){}

    private generateOtp(){
        return generate(6, {upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false});
    }

    async sendOtp({identity, type}: SendOtpDto){
        const otp = this.generateOtp();

        const existQueue = await this.prisma.queueOtp.findUnique({
            where: {identity}
        })

        if (existQueue) {
            throw new ConflictException()
        }

        await this.prisma.queueOtp.create({
            data: {otp,identity,  type: "register"}
        })

        switch (type) {
            case 'mail':
                try {
                    return await this.mailer.sendOtp({otp, identity});
                } catch (error) {
                    throw new InternalServerErrorException(error)
                }
            case 'phone':
                try {
                    return await this.smsService.sendOtp({otp, identity});
                } catch (error) {
                    throw new InternalServerErrorException(error)
                }
            default:
                break;
        }
    }

    async verifyOtp({identity, otp}: VerifyOtpDto){
        try {
            const queueOtp = await this.prisma.queueOtp.findUnique({
                where: {identity, otp, type: "register"}
            })
            if (!queueOtp) {
                throw new ForbiddenException()
            }
            
            await this.prisma.queueOtp.delete({
                where: queueOtp
            })

            return {
                error: false,
                message: 'Verfication succesfully !'
            }            
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}