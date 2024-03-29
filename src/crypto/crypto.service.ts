import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as crypto from 'crypto'

@Injectable()
export class CryptoService {
    private algo: string = 'aes-256-ctr';
    private key: string = crypto.createHash('sha256').update(String(process.env.CRYPTO_KEY)).digest('base64').substring(0, 32);

    encrypting({content, path}: {content: string, path: string}){
        fs.writeFile(path, content, (err) => {
            if (err) console.error(err)

            fs.readFile(path, (err, file) =>{
                if (err) console.log(err)

                const iv = crypto.randomBytes(16);
                const cipher = crypto.createDecipheriv(this.algo, this.key, iv)
                const result = Buffer.concat([iv, cipher.update(file), cipher.final()])

                fs.writeFile(path, result, (err) => {
                    if (err) console.log(err)
                })
            })
        });
    }
}