import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { OtpSerive } from 'src/otp.service';
import { MailService } from 'src/mailer.service';
import { SmsService } from 'src/sms.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '300s'}
    })
  ],
  providers: [AuthService, UsersService, PrismaService, JwtStrategy, OtpSerive, MailService, SmsService],
  controllers: [AuthController]
})
export class AuthModule {}
