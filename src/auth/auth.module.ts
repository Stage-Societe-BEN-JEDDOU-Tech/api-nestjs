// import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { PrismaService } from 'src/prisma.service';
// import { JwtStrategy } from './jwt-strategy';
// import { MailService } from 'src/mailer.service';
// import { AuthService } from './auth.service';
// import { OtpSerive } from 'src/otp.service';
// import { CryptoService } from 'src/crypto/crypto.service';
// import { JwtModule, JwtService } from '@nestjs/jwt';

// @Module({
//   imports: [
//     JwtModule.register({
//       global: true,
//       secret: process.env.JWT_SECRET,
//       signOptions: {expiresIn: '3d'}
//     })
//   ],
//   providers: [AuthService, PrismaService, JwtStrategy, JwtService, MailService, OtpSerive, CryptoService],
//   controllers: [AuthController]
// })
// export class AuthModule {}
