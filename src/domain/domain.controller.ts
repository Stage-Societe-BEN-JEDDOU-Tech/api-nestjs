import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { DomainService } from './domain.service';

@Controller('domain')
export class DomainController {
    constructor(private readonly domainService: DomainService){}

    @Post('/auth')
    async loginDomain(@Query('identification') identification: string){

        return await this.domainService.LoginDomain(JSON.parse(identification))
    }
}