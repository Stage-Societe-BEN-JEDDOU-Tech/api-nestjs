import { IsString } from 'class-validator';

export type InitialOmit = 'id' | 'createdAt' | 'updatedAt' | 'password';

export class LoginDTO {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
