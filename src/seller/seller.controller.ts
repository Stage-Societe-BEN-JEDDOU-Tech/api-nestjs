import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SellerDTO } from 'src/DTO/seller';
import { SellerService } from './seller.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { RoleGuard } from 'src/role-guard/role.guard';
import { LoginDTO } from 'src/DTO/auth';

@Controller('seller')
export class SellerController {
  constructor(private readonly service: SellerService) {}

  @Post()
  create(@Body() data: SellerDTO, @Query('password') password: string) {
    return this.service.create(data, password);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() data: SellerDTO, @Query('id') id: string) {
    return this.service.update(Number(id), data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.service.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(new RoleGuard('seller'))
  @Get('/auth')
  authenticate(@Request() req: { user: any }) {
    return req.user;
  }

  @Post('/login')
  login(@Body() data: LoginDTO) {
    return this.service.login(data);
  }
}
