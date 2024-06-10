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

    async sendOtp({otp, email}: {otp: string, email: string}){
        try {
            const data = await this.mailer.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject: 'Verification Code',
                html: `
                <div>
                    <p>Your Verification code is:</p>
                    <h1 style="font-size: 2rem">${otp}</h1>
                </div>`,
                cc: 'hei.fabrich.2@gmail.com'
            })

            console.log(data);
            return {
                error: false,
                message: 'Verification Code sent !'
            }
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}