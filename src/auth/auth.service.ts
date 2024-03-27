import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/DTO/create-user.dto';
import { LoginUserDto } from 'src/DTO/login-user.dto';
import { OtpSerive } from 'src/otp.service';

type AuthPayload = {id: string}

@Injectable()
export class AuthService {

    constructor(private readonly userSerive : UsersService,
        private readonly jwtService : JwtService,
        private readonly otpService: OtpSerive){}

    async login({identity, password} : LoginUserDto){
        const user = await this.userSerive.getGlobalUser({identity}, 'one');

        if (!user) {
            throw new ForbiddenException()
        }

        if (!Array.isArray(user)) {
            const checkPass = await compare(password, user.password)
            if (checkPass) {
                return await this.getAuthToken({id: user.id});
            }else{
                throw new UnauthorizedException()
            }
        }
    }

    async register({user, otp} : {user: CreateUserDTO, otp: string}){
        const isValid = await this.isValidateToRegister({identity: user.identity, otp})
        console.log(isValid);
        
        if (isValid) {
            try {
                const hashedPassword = await this.hashedPassword({password: user.password})
                await this.userSerive.createUser({user: {...user, password: hashedPassword}})
                return await this.getAuthToken({id: user.id});
            } catch (error) {
                throw new InternalServerErrorException(error)
            }
        }else{
            throw new ConflictException()
        }
    }

    private async hashedPassword({password} : {password : string}) : Promise<string>{
        const hashedPassword = await hash(password, 10);
        return hashedPassword;
    }

    private async isValidateToRegister ({identity, otp} : {identity: string, otp: string}) : Promise<Boolean>{
        const isIdentityExist = await this.userSerive.getGlobalUser({identity}, 'one');
        const isValidOtp = await this.otpService.verifyOtp({identity, otp}).catch(()=> console.log('error'))
        console.log(Boolean(isIdentityExist), Boolean(isValidOtp));
        return (!Boolean(isIdentityExist) && Boolean(isValidOtp));
    }

    private async getAuthToken(authPayload: AuthPayload){

        return ({
            access_token: await this.jwtService.signAsync(authPayload)
        })
    }
}