import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigDomainDto } from 'src/DTO/config-domain.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DomainService {
    constructor(private readonly prismaService: PrismaService){}
}
