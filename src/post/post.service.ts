import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PostDTO } from 'src/DTO/post';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly db: PrismaService) {}

  async create(data: PostDTO) {
    try {
      await this.db.post.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, data: PostDTO) {
    try {
      await this.db.post.update({
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
