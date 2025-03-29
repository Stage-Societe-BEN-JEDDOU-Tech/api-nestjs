import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BuyerModule } from './buyer/buyer.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    BuyerModule,
    SellerModule,
  ],
})
export class AppModule {}