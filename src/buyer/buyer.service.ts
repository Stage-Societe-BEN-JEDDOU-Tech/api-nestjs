import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BuyerDTO } from 'src/DTO/buyer';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BuyerService {
  constructor(private readonly db: PrismaService) {}

  async create(data: BuyerDTO) {
    try {
      await this.db.buyer.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, data: BuyerDTO) {
    try {
      await this.db.buyer.update({
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
