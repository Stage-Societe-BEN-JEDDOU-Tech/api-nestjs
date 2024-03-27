import { Injectable, Res } from '@nestjs/common';
import { CreateUserDTO } from 'src/DTO/create-user.dto';
import { OtpSerive } from 'src/otp.service';
import * as fs from 'node:fs'

@Injectable()
export class AuthService {
    constructor(private readonly otpService: OtpSerive){}

    async sendOtp({mail}: {mail: string}){
        return await this.otpService.sendOtp({mail})
    }
    
    async register(user: CreateUserDTO){

        const verfied = await this.otpService.verifyOtp({mail: user.mail, otp: user.otp})
        if (verfied) {

            const badgeContent = JSON.stringify(({...user, otp: undefined}));

            fs.writeFile(`src/Badges/DontShare${user.id}.ds`, badgeContent, (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log('Fichier .txt généré avec succès');
                }
              });

            // Téléchargez le fichier de badge numérique en tant que réponse HTTP
            // res.download(filePath, `DontShare_${user.id}.txt`, () => {
            //   // Supprimez le fichier de badge après le téléchargement
            //   fs.unlinkSync(filePath);
            // });
            
            // return {
            //     message: "Successfully !"
            // }
        }
    }
}
