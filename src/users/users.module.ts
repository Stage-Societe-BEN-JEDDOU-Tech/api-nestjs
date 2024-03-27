import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { CodeReset } from './code-reset.service';
import { MailService } from 'src/mailer.service';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, CodeReset, MailService]
})
export class UsersModule {}
