import { Body, Controller, Post, Put, Query } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerDTO } from 'src/DTO/buyer';

@Controller('buyer')
export class BuyerController {
  constructor(private readonly service: BuyerService) {}

  @Post()
  create(@Body() data: BuyerDTO, @Query('password') password: string) {
    return this.service.create(data, password);
  }

  @Put()
  update(@Body() data: BuyerDTO, @Query('id') id: string) {
    return this.service.update(Number(id), data);
  }
}
