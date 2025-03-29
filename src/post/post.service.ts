import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PostDTO } from 'src/DTO/post';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly db: PrismaService) {}

  async create(data: PostDTO) {
    try {
      return await this.db.post.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, data: PostDTO) {
    try {
      return await this.db.post.update({
        data,
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll() {
    try {
      return await this.db.post.findMany({
        select: {
          city: true,
          title: true,
          id: true,
          isAvailable: true,
          isSold: true,
          photo: true,
          price: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getOne(id: number) {
    try {
      await this.db.post.update({
        where: { id },
        data: {
          view: {
            increment: 1,
          },
        },
      });
      return await this.db.post.findUnique({
        where: { id },
        include: {
          categories: true,
          seller: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
