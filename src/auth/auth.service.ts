import { Injectable, Res } from '@nestjs/common';
import { CreateUserDTO } from 'src/DTO/create-user.dto';
import { OtpSerive } from 'src/otp.service';
import * as fs from 'node:fs'
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as crypt from 'crypto-js'
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class AuthService {
    constructor(private readonly otpService: OtpSerive,
        private readonly jwtService: JwtService,
        private readonly crypto: CryptoService){}

    async sendOtp({mail}: {mail: string}){
        return await this.otpService.sendOtp({mail})
    }
    
    async register(user: CreateUserDTO){

        const verfied = await this.otpService.verifyOtp({mail: user.mail, otp: user.otp})
        if (verfied) {

            // const badgeContent = crypt.RC4Drop.encrypt(JSON.stringify(({...user, otp: undefined})), process.env.CRYPTO_KEY, {
            //     drop: 1000
            // });
            // var decipher= crypt.RC4Drop.decrypt(badgeContent,process.env.CRYPTO_KEY, {
            //     drop: 1000
            // });
            // console.log(decipher.);
            
            const badgePath = `src/Badges/DontShare${user.id}.ds`

// hosting data first

            // fs.writeFile(badgePath, badgeContent.toString(), (err) => {
            //     if (err) {
            //       console.error(err);
            //     } else {
            //       console.log('Fichier .txt généré avec succès');
            //     }
            // });

            this.crypto.encrypting({
                content: JSON.stringify({...user, otp: undefined}),
                path: badgePath
            })
            
            return ({
                // encrypt: badgeContent,
                // decrypt: decipher,
                id: user.id,
                access_token: await this.jwtService.signAsync({id: user.id})
            })
        }
    }

}