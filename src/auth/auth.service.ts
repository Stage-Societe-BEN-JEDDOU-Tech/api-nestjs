import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mailer.service';
import { OtpSerive } from 'src/otp.service';

@Injectable()
export class AuthService {
    constructor(private readonly mailerService: MailService,
        private readonly otpService: OtpSerive
    ){}

    async sendOtp({mail}: {mail: string}){
        return await this.otpService.sendOtp({mail})
    }
}
