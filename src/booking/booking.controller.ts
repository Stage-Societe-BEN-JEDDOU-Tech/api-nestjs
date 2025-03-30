import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookDTO, MessageDTO } from 'src/DTO/booking';

@Controller('booking')
export class BookingController {
  constructor(private readonly service: BookingService) {}

  @UseGuards()
  @Post()
  create(@Body() data: BookDTO) {
    return this.service.create(data);
  }

  @Put()
  update(@Body() data: BookDTO, @Query('id') id: string) {
    return this.service.update(data, Number(id));
  }

  @Get()
  getAll(@Query('sellerId') sellerId: string) {
    return this.service.getAll(Number(sellerId));
  }

  @Post('/message')
  sendMessage(@Body() data: MessageDTO) {
    return this.service.sendMessage(data);
  }

  @Get('/message')
  getMessage(@Query('bookId') bookId: string) {
    return this.service.getMessage(Number(bookId));
  }
}
