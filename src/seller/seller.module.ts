import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [SellerService, PrismaService],
  controllers: [SellerController],
})
export class SellerModule {}
