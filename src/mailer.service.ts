import { InternalServerErrorException } from "@nestjs/common";
import { Resend } from "resend";

export class MailService{
    private readonly mailer: Resend
    constructor(){
        this.mailer = new Resend(process.env.RESEND_API_KEY)
    }

    async sendLinkReset(
    {name, identity, link} :
    {name: string, identity: string, link: string}){

        try {
            const data = await this.mailer.emails.send({
                from: 'onboarding@resend.dev',
                to: identity,
                subject: 'Reset password',
                html: `<p>Hello ${name}</p>
                <h3>Click <a target="blank" href="${link}">here<a> to reset your password</h3>`,
                cc: 'hei.fabrich.2@gmail.com'
            })

            console.log(data.data);
            return {
                error: false,
                message: 'Link sent !'
            }
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async sendOtp({otp, mail}: {otp: string, mail: string}){
        try {
            const data = await this.mailer.emails.send({
                from: 'onboarding@resend.dev',
                to: mail,
                subject: 'Verification Code',
                html: `<p>Your Verification code is:</p>
                <h1>${otp}</h1>`,
                cc: 'hei.fabrich.2@gmail.com'
            })

            console.log(data.data);
            return {
                error: false,
                message: 'Verification Code sent !'
            }
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}