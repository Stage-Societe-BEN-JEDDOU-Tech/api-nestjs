import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigDomainDto } from 'src/DTO/config-domain.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DomainService {
    constructor(private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService){}

    async configDomain({appId, key, host} : ConfigDomainDto){
        const existDomain = await this.prismaService.domain.findUnique({
            where: {appId, key, host}
        })

        if(!existDomain) throw new UnauthorizedException()

        return {
            errr: false,
            access_token: this.getToken(appId)
        }

    }

    private getToken(id: string){
        const token = this.jwtService.sign({id}, {
            secret: process.env.JWT_SECRET
        })
        return token
    }
}
