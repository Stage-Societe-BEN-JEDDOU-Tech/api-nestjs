import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDTO } from 'src/DTO/create-user.dto';
import { AuthService } from './auth.service';

export type SigninBody = {identity: string, password: string}

@Controller('auth')
export class AuthController {

    constructor(private readonly authService : AuthService){}

    @Post('/sendOtp')
    async sendOtp(@Body() {mail} : {mail: string}){
        return await this.authService.sendOtp({mail})
    }

    @Post('/register')
    async register(@Body() user : CreateUserDTO, @Query('otp') otp: string){
        console.log(otp);
    }
}