import { Controller, Get } from '@nestjs/common';

@Controller('domain')
export class DomainController {

    @Get()
    get(){
        return "get"
    }
}
