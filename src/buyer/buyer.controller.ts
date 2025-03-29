import { Body, Controller, Post, Put, Query } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerDTO } from 'src/DTO/buyer';

@Controller('buyer')
export class BuyerController {
  constructor(private readonly service: BuyerService) {}

  @Post()
  create(@Body() data: BuyerDTO) {
    return this.service.create(data);
  }

  @Put()
  update(@Body() data: BuyerDTO, @Query('id') id: string) {
    return this.service.update(Number(id), data);
  }
}
