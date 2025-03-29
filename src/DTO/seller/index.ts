import { Seller } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class SellerDTO
  implements Omit<Seller, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsArray()
  contact: string[];
  @IsString()
  name: string;
  @IsString()
  email: string;
}
