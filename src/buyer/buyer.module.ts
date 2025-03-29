import { Module } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [BuyerService, PrismaService],
  controllers: [BuyerController]
})
export class BuyerModule {}
