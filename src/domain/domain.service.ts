import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DomainService {
    constructor(private readonly prismaService: PrismaService){}

    verify(){
        
    }
}
