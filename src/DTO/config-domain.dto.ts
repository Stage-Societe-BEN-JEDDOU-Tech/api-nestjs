import { IsNotEmpty, IsString } from 'class-validator'

export class ConfigDomainDto{

    @IsNotEmpty()
    @IsString()
    appId: string

    @IsNotEmpty()
    @IsString()
    key: string

    @IsNotEmpty()
    @IsString()
    host: string
}