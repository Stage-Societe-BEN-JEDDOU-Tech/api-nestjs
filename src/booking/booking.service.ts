import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BookDTO, MessageDTO } from 'src/DTO/booking';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookingService {
  constructor(private readonly db: PrismaService) {}

  async create(data: BookDTO) {
    try {
      return await this.db.book.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(data: BookDTO, id: number) {
    try {
      return await this.db.book.update({
        data,
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(sellerId: number) {
    try {
      return await this.db.book.findMany({
        include: {
          buyer: true,
          post: true,
        },
        where: {
          post: {
            sellerId,
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendMessage(data: MessageDTO) {
    try {
      return await this.db.message.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getMessage(bookId: number) {
    try {
      return await this.db.message.findMany({
        where: {
          bookId,
        },
        include: {
          book: {
            include: {
              buyer: true,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
