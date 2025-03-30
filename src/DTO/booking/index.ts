import { Book, Message } from '@prisma/client';
import { InitialOmit } from '../global';
import { IsNumber, IsString } from 'class-validator';

export class BookDTO implements Omit<Book, InitialOmit> {
  @IsNumber()
  buyerId: number;
  @IsString()
  isSold: boolean;
  @IsString()
  message: string;
  @IsNumber()
  postId: number;
}

export class MessageDTO implements Omit<Message, InitialOmit> {
  @IsNumber()
  bookId: number;
  @IsString()
  content: string;
}
