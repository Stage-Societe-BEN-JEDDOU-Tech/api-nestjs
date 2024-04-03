import { IsNotEmpty } from "class-validator";

export class SendOtp{

    @IsNotEmpty()
    email: string
}