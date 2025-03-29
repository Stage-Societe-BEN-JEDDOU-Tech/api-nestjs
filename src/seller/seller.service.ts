import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { JWtPayload, LoginDTO } from 'src/DTO/auth';
import { SellerDTO } from 'src/DTO/seller';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SellerService {
  constructor(
    private readonly db: PrismaService,
    private readonly auth: AuthService,
  ) {}

  async create(data: SellerDTO, password: string) {
    try {
      const hashed = hashSync(password, 10);
      return await this.db.seller.create({
        data: { ...data, password: hashed },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, data: SellerDTO) {
    try {
      return await this.db.seller.update({
        data,
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async login({ email, password }: LoginDTO) {
    try {
      const found = await this.db.seller.findUnique({
        where: {
          email,
        },
      });

      if (!found) {
        throw new NotFoundException();
      }

      if (!compareSync(password, found.password)) {
        throw new NotFoundException();
      }

      const token = this.auth.signUser(found.id);

      return { token };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async authenticate(token: string) {
    try {
      const { user } = this.auth.verifyUserToken<JWtPayload>(token);

      if (!user) {
        throw new UnauthorizedException();
      }

      const found = await this.db.seller.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!found) {
        throw new UnauthorizedException();
      }

      return found;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll() {
    try {
      return await this.db.seller.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
