import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { DomainService } from './domain.service';
import { loginDomainDto } from 'src/DTO/login-domain.dto';

@Controller('domain')
export class DomainController {
    constructor(private readonly domainService: DomainService){}

    @Post()
    async loginDomain(@Body() identification: loginDomainDto){
        return await this.domainService.LoginDomain(identification)
    }
}
