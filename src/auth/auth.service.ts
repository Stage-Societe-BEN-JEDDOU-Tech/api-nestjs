import { BadRequestException, Injectable, InternalServerErrorException, Res } from '@nestjs/common';
import { CreateUserDTO } from 'src/DTO/create-user.dto';
import { OtpSerive } from 'src/otp.service';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/crypto/crypto.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly db: PrismaService,
        private readonly otpService: OtpSerive,
        private readonly jwtService: JwtService,
        private readonly crypto: CryptoService)
    {}

    async sendOtp({mail}: {mail: string}){
        return await this.otpService.sendOtp({mail})
    }
    
    async register(user: CreateUserDTO){

        const verfied = await this.otpService.verifyOtp({mail: user.mail, otp: user.otp})
        const existUser = await this.db.user.findFirst({
            where: {mail: user.mail}
        });
        
        if (verfied && !existUser) {
            const badgePath = `src/Badges/DontShare${user.id}.badge`    
            try {
                this.crypto.encrypting({
                    content: JSON.stringify({...user, otp: undefined}),
                    path: badgePath
                })

                const userToCreate = {...user, otp: undefined}
                await this.db.user.create({
                    data: {...userToCreate}
                })
            } catch (error) {
                throw new InternalServerErrorException(error)
            }

            return ({
                pathBadge: `/badge?id=${user.id}`,
                access_token: await this.jwtService.signAsync({id: user.id})
            })
        }else{
            throw new BadRequestException()
        }
    }

}