import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { Domain } from 'domain';
import { ConfigModule } from '@nestjs/config';
import { CryptoModule } from './crypto/crypto.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    isGlobal: true
  }), CryptoModule, DomainModule],
})
export class AppModule {}