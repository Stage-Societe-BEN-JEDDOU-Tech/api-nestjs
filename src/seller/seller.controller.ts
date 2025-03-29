import { Body, Controller, Post, Put, Query } from '@nestjs/common';
import { SellerDTO } from 'src/DTO/seller';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
  constructor(private readonly service: SellerService) {}

  @Post()
  create(@Body() data: SellerDTO) {
    return this.service.create(data);
  }

  @Put()
  update(@Body() data: SellerDTO, @Query('id') id: string) {
    return this.service.update(Number(id), data);
  }
}
