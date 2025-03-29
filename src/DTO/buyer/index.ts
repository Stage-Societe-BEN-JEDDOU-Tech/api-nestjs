import { Buyer } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';
import { InitialOmit } from '../global';

export class BuyerDTO implements Omit<Buyer, InitialOmit> {
  @IsArray()
  contact: string[];
  @IsString()
  name: string;
  @IsString()
  email: string;
}
