import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CodeReset } from './code-reset.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService, private readonly codereset: CodeReset){}

    @UseGuards(JwtAuthGuard)
    @Get('/ask-reset')
    async askRest(@Request() {user: {id}} : {user: { id: string }}){
        return await this.codereset.askReset({id});
    }

    @UseGuards(JwtAuthGuard)
    @Get('/verify-resest-code')
    async verifyCode(@Request() {user: {id}} : {user: { id: string }}, @Query('code') code : string){
        return this.codereset.verifiyCode(id, code);
    }
}
