import { IsNotEmpty, IsString } from "class-validator";

export class VerifyOtpDto{

    @IsNotEmpty()
    otp: string

    @IsString()
    identity: string
}