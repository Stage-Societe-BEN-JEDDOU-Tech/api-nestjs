import { IsNotEmpty } from "class-validator";

export class CreateUserDTO{

    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    firstname: string

    @IsNotEmpty()
    lastname: string

    @IsNotEmpty()
    mail: string

    @IsNotEmpty()
    resetKey: string
}