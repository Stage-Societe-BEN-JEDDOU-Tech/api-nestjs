import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDomainDto } from 'src/DTO/login-domain.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DomainService {
    constructor(private readonly prismaService: PrismaService){}

    async createDomain(){
        return this.prismaService.domain.create({
            data: null
        })
    }

    async LoginDomain(@Body() identification: loginDomainDto){
        const existDomain = await this.prismaService.domain.findUnique({
            where: identification
        })

        if(!existDomain) throw new UnauthorizedException()

        return {
            error: false
        }
    }
}
