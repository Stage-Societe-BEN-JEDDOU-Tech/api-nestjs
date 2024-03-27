import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateUserDTO } from 'src/DTO/create-user.dto';
import { SendOtpDto } from 'src/DTO/send-otp.dto';
import { OtpSerive } from 'src/otp.service';
import { VerifyOtpDto } from 'src/DTO/verify-otp.dto';
import { LoginUserDto } from 'src/DTO/login-user.dto';

export type SigninBody = {identity: string, password: string}

@Controller('auth')
export class AuthController {

    constructor(private readonly authService : AuthService,
        private readonly usersService: UsersService,
        private readonly otpService:OtpSerive){}

    @Post('/login')
    async login(@Body() {identity, password}: LoginUserDto){
        return await this.authService.login({identity, password});
    }

    @Post('/register')
    async register(@Body() user : CreateUserDTO, @Query('otp') otp: string){
        console.log(otp);
        
        return await this.authService.register({user,  otp});
    }

    @Post('/sendotp')
    async sendOtp(@Body() {identity, type}: SendOtpDto){
        return this.otpService.sendOtp({identity, type});
    }

    @Post('/verifyotp')
    async verifyOtp(@Body() {identity, otp}: VerifyOtpDto){
        return this.otpService.verifyOtp({identity, otp});
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async authenticate(@Request() {user: {id}} : {user: {id: string}}){
        const user = await this.usersService.getGlobalUser({id}, 'one')
            .then(u => ({...u, password: undefined}))
        return user;
    }
}