import { IsNotEmpty, IsString } from "class-validator";

export class loginDomainDto{

    @IsNotEmpty()
    @IsString()
    appId: string

    @IsNotEmpty()
    @IsString()
    secretKey: string
}