import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SellerDTO } from 'src/DTO/seller';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SellerService {
  constructor(private readonly db: PrismaService) {}

  async create(data: SellerDTO) {
    try {
      await this.db.seller.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, data: SellerDTO) {
    try {
      await this.db.seller.update({
        data,
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
