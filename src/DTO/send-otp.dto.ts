import { IsNotEmpty } from "class-validator";

export class SendOtp{

    @IsNotEmpty()
    mail: string
}