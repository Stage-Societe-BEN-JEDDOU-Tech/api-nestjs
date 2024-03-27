import { Body, Controller, Get, Post } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDTO } from 'src/DTO/create-user.dto';
import { AuthService } from './auth.service';
import { SendOtp } from 'src/DTO/send-otp.dto';

export type SigninBody = {identity: string, password: string}

@Controller('auth')
export class AuthController {

    constructor(private readonly authService : AuthService){}

    @Post('/sendOtp')
    async sendOtp(@Body() {mail}: SendOtp){
        return await this.authService.sendOtp({mail})
    }

    @Post('/register')
    async register(@Body() req : CreateUserDTO){
        return await this.authService.register(req)
    }
}