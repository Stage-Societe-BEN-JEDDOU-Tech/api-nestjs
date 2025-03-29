import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signUser(id: string | number) {
    const token = this.jwt.signAsync(
      { id },
      {
        secret: process.env.JWT_SECRET,
      },
    );

    return token;
  }

  verifyUserToken<Payload extends object = any>(token: string) {
    try {
      const decoded = this.jwt.verify<Payload>(token, {
        secret: process.env.JWT_SECRET,
      });

      return { user: decoded };
    } catch (error) {
      throw new BadRequestException('token invalid');
    }
  }
}
