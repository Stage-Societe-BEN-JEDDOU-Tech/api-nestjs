import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Twilio } from "twilio";

@Injectable()
export class SmsService{
    private readonly client : Twilio;
    constructor(){
        this.client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)
    }

    async sendOtp({otp, identity}: {otp: string, identity: string}){
        try {
            this.client.messages
                .create({
                from: process.env.TWILIO_NUMBER,
                to: identity,
                body: `Your Verification code is: ${otp}`,
                })
                .then((message) => {
                    console.log(message.sid)
                    return {
                        error: false,
                        message: 'Verification Code sent !'
                    }
                })
                .catch(error=> {
                    throw new InternalServerErrorException(error)
                })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}