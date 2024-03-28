import { Body, Controller, Get, Post, Query, Request, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDTO } from 'src/DTO/create-user.dto';
import { AuthService } from './auth.service';
import { SendOtp } from 'src/DTO/send-otp.dto';
import { Response } from 'express';

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

    @UseGuards(JwtAuthGuard)
    @Get('/getBadge')
    getBadge(@Request() req, @Res() res: Response, @Query('id') idQuery: string){
        console.log(req.user);
        
        if (req.user) {
            const {id} = req.user;
            console.log({id, idQuery});
            
            if (id === idQuery) {
             
            res.download(`src/Badges/DontShare${id}.ds`)
            }
        }
    }

    // @Get()
    // getBadge(@Res() res: Response){
    //     res.download('src/Badges/DontShare1.ds')
    // }

}