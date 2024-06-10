import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from 'src/DTO/create-user.dto';
import { OtpSerive } from 'src/otp.service';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/crypto/crypto.service';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { Response } from 'express';
import * as fs from 'node:fs'

@Injectable()
export class AuthService {
    constructor(private readonly db: PrismaService,
        private readonly otpService: OtpSerive,
        private readonly jwtService: JwtService,
        private readonly crypto: CryptoService) { }

    async getUser({ id }): Promise<User> {
        try {
            const existUser = await this.db.user.findUnique({
                where: { id }
            })
            if (!existUser) throw new NotFoundException()

            return existUser;
        } catch (error) {
            console.log(error);

        }
    }

    async sendOtp({ email }: { email: string }) {
        return await this.otpService.sendOtp({ email })
    }

    async register(user: CreateUserDTO) {

        const verfied = await this.otpService.verifyOtp({ email: user.email, otp: user.otp })
        const existUser = await this.db.user.findFirst({
            where: { email: user.email }
        });

        if (!verfied) throw new ForbiddenException()
        if (existUser) throw new BadRequestException()

        const badgePath = `src/Badges/DontShare${user.id}.badge`
        try {
            this.crypto.encrypting({
                content: JSON.stringify({ ...user, otp: undefined }),
                path: badgePath
            })

            const userToCreate = { ...user, otp: undefined }
            await this.db.user.create({
                data: { ...userToCreate }
            })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }

        return ({
            pathBadge: `auth/badge?id=${user.id}`,
            access_token: this.jwtService.sign({ id: user.id }, {
                secret: process.env.JWT_SECRET
            })
        })

    }

    async login({ file }: { file: Express.Multer.File }) {
        const encripted = file.buffer.toString()
        const decripted: User = JSON.parse(this.crypto.decrypting({ encryptedContent: encripted }))

        const existUser = await this.db.user.findUnique({
            where: decripted
        })

        if (!existUser) throw new ForbiddenException()

        return {
            user: existUser,
            access_token: this.jwtService.sign(existUser, {secret:process.env.JWT_SECRET})
        }
    }

    async tryLogin({ file }: { file: Express.Multer.File }) {
        const encripted = file.buffer.toString()
        const decripted: User = JSON.parse(this.crypto.decrypting({ encryptedContent: encripted }))

        const existUser = await this.db.user.findUnique({
            where: decripted
        })

        if (!existUser) throw new ForbiddenException()

        return {
            user: existUser
        }
    }

    verifyUserToken(token: string) {
        try {
            const decoded = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET
            })

            return { user: decoded }
        } catch (error) {
            throw new BadRequestException('token invalid')
        }
    }

    async regetBadge(email: string) {
        try {
            const user = await this.db.user.findUnique({
                where: { email }
            })

            if (!user) throw new NotFoundException()

            const badgePath = `src/Badges/DontShare${user.id}.badge`

            this.crypto.encrypting({
                content: JSON.stringify({ ...user, otp: undefined }),
                path: badgePath
            })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async got(token: string, res: Response) {
        try {
            const { id } = await this.jwtService.verify(token, { secret: process.env.JWT_SECRET })
            if (!id) throw new BadRequestException()

            res.download(`src/Badges/DontShare${id}.badge`)
            fs.rm(`src/Badges/DontShare${id}.badge`, (err) => {
                if (err) console.log(err)
            })
        } catch (error) {
            throw error
        }
    }
}