import { IsString } from "class-validator";

export class SendOtpDto{

    @IsString()
    identity: string

    @IsString()
    type: 'mail' | 'phone'
}