import { ForbiddenException, Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as crypto from 'crypto'

@Injectable()
export class CryptoService {
    private algo: string = 'aes-256-ctr';
    private key: string = crypto.createHash('sha256').update(String(process.env.CRYPTO_KEY)).digest('base64').substring(0, 32);

    encrypting({ content, path }: { content: string, path: string }) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algo, this.key, iv);
        let encryptedContent = cipher.update(content, 'utf8', 'hex');
        encryptedContent += cipher.final('hex');
    
        const encryptedData = iv.toString('hex') + encryptedContent;
    
        fs.writeFile(path, encryptedData, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Contenu chiffré et écrit dans le fichier avec succès');
            }
        });
    }    

    decrypting({ encryptedContent }: { encryptedContent: string }) {
        // Convertir l'IV à partir de la chaîne hexadécimale
        const iv = Buffer.from(encryptedContent.slice(0, 32), 'hex');
        
        // Extraire le contenu chiffré à partir de la chaîne hexadécimale
        const encryptedText = encryptedContent.slice(32);
        
        try {
            // Créer un déchiffreur avec la même clé et IV
            const decipher = crypto.createDecipheriv(this.algo, this.key, iv);
            // Déchiffrer le contenu
            let decryptedContent = decipher.update(encryptedText, 'hex', 'utf8');
            decryptedContent += decipher.final('utf8');

            return decryptedContent;    
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }
    
}