import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BuyerModule } from './buyer/buyer.module';
import { SellerModule } from './seller/seller.module';
import { PostModule } from './post/post.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BuyerModule,
    SellerModule,
    PostModule,
  ],
  providers: [AuthService, JwtService, PrismaService],
})
export class AppModule {}
