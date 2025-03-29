import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [SellerService, PrismaService, AuthService, JwtService],
  controllers: [SellerController],
})
export class SellerModule {}
