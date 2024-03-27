import { IsNotEmpty, IsString, Min } from "class-validator";

export class CreateUserDTO{

    @IsNotEmpty()
    id: string

    @IsString()
    identity: string

    @IsString()
    type: 'mail' | 'phone'

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    domain: string
}