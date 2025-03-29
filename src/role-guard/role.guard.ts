import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWtPayload } from 'src/DTO/auth';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private requiredRole?: 'seller' | 'buyer' | 'admin') {}

  private readonly db = new PrismaService();
  private readonly jwt = new JwtService();

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authorization.replace('Bearer ', '');

    try {
      const decoded = this.jwt.verify<JWtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });

      switch (this.requiredRole) {
        case 'buyer': {
          const found = await this.db.buyer.findUnique({
            where: {
              id: decoded.id,
            },
          });

          if (!found) {
            throw new ForbiddenException('Access denied');
          }

          return true;
        }

        case 'seller': {
          const found = await this.db.seller.findUnique({
            where: {
              id: decoded.id,
            },
          });

          if (!found) {
            throw new ForbiddenException('Access denied');
          }

          return true;
        }

        default:
          throw new ForbiddenException('Access denied');
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
