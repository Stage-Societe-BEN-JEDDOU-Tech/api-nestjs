import { IsNotEmpty } from "class-validator"

export class LoginUserDto{

    @IsNotEmpty()
    identity: string

    @IsNotEmpty()
    password: string
}