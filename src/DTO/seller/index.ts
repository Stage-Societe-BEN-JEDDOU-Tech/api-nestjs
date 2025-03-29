import { Seller } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';
import { InitialOmit } from '../global';

export class SellerDTO implements Omit<Seller, InitialOmit> {
  @IsArray()
  contact: string[];
  @IsString()
  name: string;
  @IsString()
  email: string;
}
