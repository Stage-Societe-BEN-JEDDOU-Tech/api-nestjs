import { Buyer } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class BuyerDTO implements Omit<Buyer, 'id'> {
  @IsArray()
  contact: string[];
  @IsString()
  name: string;
  @IsString()
  email: string;
}
