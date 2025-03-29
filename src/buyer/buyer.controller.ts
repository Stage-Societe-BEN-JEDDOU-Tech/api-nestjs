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
import { BuyerService } from './buyer.service';
import { BuyerDTO } from 'src/DTO/buyer';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { RoleGuard } from 'src/role-guard/role.guard';
import { LoginDTO } from 'src/DTO/auth';

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

  @UseGuards(JwtAuthGuard)
  @UseGuards(new RoleGuard('buyer'))
  @Get('/auth')
  authenticate(@Request() req: { user: any }) {
    return req.user;
  }

  @Post('/login')
  login(@Body() data: LoginDTO) {
    return this.service.login(data);
  }
}
