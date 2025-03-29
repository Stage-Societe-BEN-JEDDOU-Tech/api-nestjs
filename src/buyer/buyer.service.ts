import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { JWtPayload, LoginDTO } from 'src/DTO/auth';
import { BuyerDTO } from 'src/DTO/buyer';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BuyerService {
  constructor(
    private readonly db: PrismaService,
    private readonly auth: AuthService,
  ) {}

  async create(data: BuyerDTO, password: string) {
    try {
      const hashed = hashSync(password, 10);
      return await this.db.buyer.create({
        data: { ...data, password: hashed },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, data: BuyerDTO) {
    try {
      return await this.db.buyer.update({
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
      const found = await this.db.buyer.findUnique({
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

      const found = await this.db.buyer.findUnique({
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
      return await this.db.buyer.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
