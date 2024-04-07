import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { DomainService } from './domain.service';
import { ConfigDomainDto } from 'src/DTO/config-domain.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('domain')
export class DomainController {
    constructor(private readonly domainService: DomainService){}
    
    @Post('config')
    async configDomain(@Body() config: ConfigDomainDto){
        console.log(config);
        
        return await this.domainService.configDomain(config)
    }

    @UseGuards(JwtAuthGuard)
    @Get('verify')
    async verify(@Request() req){
        return {
            error: false,
            id: req.user.id
        }
    }

}
