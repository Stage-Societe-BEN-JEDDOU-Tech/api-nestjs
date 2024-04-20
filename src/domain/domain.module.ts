import { Module } from '@nestjs/common';
import { DomainController } from './domain.controller';
import { DomainService } from './domain.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DomainController],
  providers: [DomainService, PrismaService]
})
export class DomainModule {}
