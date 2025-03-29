import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SellerDTO } from 'src/DTO/seller';
import { SellerService } from './seller.service';
import { RoleGuard } from 'src/role-guard/role.guard';

@Controller('seller')
export class SellerController {
  constructor(private readonly service: SellerService) {}

  @UseGuards(new RoleGuard('seller'))
  @Post()
  create(@Body() data: SellerDTO, @Query('password') password: string) {
    return this.service.create(data, password);
  }

  @UseGuards(new RoleGuard('seller'))
  @Put()
  update(@Body() data: SellerDTO, @Query('id') id: string) {
    return this.service.update(Number(id), data);
  }

  @UseGuards(new RoleGuard('seller'))
  @Get()
  getAll() {
    return true;
  }
}
