import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/DTO/create-user.dto';
import { OtpSerive } from 'src/otp.service';

@Injectable()
export class AuthService {
    constructor(private readonly otpService: OtpSerive){}

    async sendOtp({mail}: {mail: string}){
        return await this.otpService.sendOtp({mail})
    }
    
    async register(req: CreateUserDTO){
        console.log(req);
        
        const verfied = await this.otpService.verifyOtp({mail: req.mail, otp: req.otp})        
        return verfied;
    }
}
