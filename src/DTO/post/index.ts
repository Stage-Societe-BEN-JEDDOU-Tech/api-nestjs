import { Post } from '@prisma/client';
import { InitialOmit } from '../global';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class PostDTO implements Omit<Post, InitialOmit | 'view'> {
  @IsNumber()
  price: number;
  @IsString()
  adress: string;
  @IsString()
  city: string;
  @IsArray()
  condition: string[];
  @IsString()
  description: string;
  @IsArray()
  photo: string[];
  @IsString()
  title: string;
  @IsNumber()
  sellerId: number;
  @IsBoolean()
  isAvailable: boolean;
  @IsBoolean()
  isSold: boolean;
}
