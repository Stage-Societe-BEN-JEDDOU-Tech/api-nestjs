import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDTO } from 'src/DTO/create-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {

    constructor(private readonly prisma : PrismaService){}

    async getGlobalUser(where: Prisma.UserWhereInput, category : 'one' | 'many'){
        switch (category) {
            case 'one':
                return await this.prisma.user.findFirst({where})
            case 'many':
                return await this.prisma.user.findMany({where})
            default:
                break;
        }
    }

    async createUser({user} : {user : CreateUserDTO}){
        const created = await this.prisma.user.create({data: user})
        return created;
    }
}
