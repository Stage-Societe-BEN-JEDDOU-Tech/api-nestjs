import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {}

// import { Body, Controller, Get, Post, Query, Req, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
// import { JwtAuthGuard } from './jwt-auth.guard';
// import { CreateUserDTO } from 'src/DTO/create-user.dto';
// import { AuthService } from './auth.service';
// import { SendOtp } from 'src/DTO/send-otp.dto';
// import { Response } from 'express';
// import { FileInterceptor } from '@nestjs/platform-express';
// import * as fs from 'node:fs'
// import { VerifyTokenDto } from 'src/DTO/verify-token.dto';
// import { JwtService } from '@nestjs/jwt';

// export type SigninBody = { identity: string, password: string }

// @Controller('auth')
// export class AuthController {

//     constructor(
//         private readonly authService: AuthService,
//         private readonly jwt: JwtService) {}

//     @Post('/sendOtp')
//     async sendOtp(@Body() { email }: SendOtp) {
//         return await this.authService.sendOtp({ email })
//     }

//     @Post('/register')
//     async register(@Body() req: CreateUserDTO) {
//         return await this.authService.register(req)
//     }

//     @UseGuards(JwtAuthGuard)
//     @Get('/badge')
//     getBadge(@Request() req, @Res() res: Response, @Query('id') idQuery: string) {
//         console.log(req.user);
//         if (req.user) {
//             const { id } = req.user;
//             console.log({ id, idQuery });

//             if (id === idQuery) {
//                 res.download(`src/Badges/DontShare${id}.badge`)
//                 fs.rm(`src/Badges/DontShare${id}.badge`, (err) => {
//                     if (err) console.log(err)
//                 })
//             }
//         }
//     }

//     @Get('/reget')
//     regetBadge(@Query('email') email: string){
//         return this.authService.regetBadge(email)
//     }

//     @Get('got')
//     gotBadge(@Query('token') token: string, @Res() res: Response){
//         return this.authService.got(token, res)
//     }

//     @Post('login')
//     @UseInterceptors(FileInterceptor('file'))
//     login(@UploadedFile() file: Express.Multer.File) {
//         return this.authService.login({file})
//     }

//     @Post('try-login')
//     @UseInterceptors(FileInterceptor('file'))
//     tryLogin(@UploadedFile() file: Express.Multer.File) {
//         return this.authService.login({file})
//     }

//     @UseGuards(JwtAuthGuard)
//     @Get()
//     auth(@Request() req) {
//         const id = req.user.id;
//         return this.authService.getUser({id})
//     }
// }
