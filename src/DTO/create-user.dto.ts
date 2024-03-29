import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDTO{

    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    firstname: string

    @IsNotEmpty()
    lastname: string

    @IsEmail({}, {
        message: "Email invalid"
    })
    mail: string

    @IsNotEmpty()
    otp: string
}