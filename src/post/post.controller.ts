import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { RoleGuard } from 'src/role-guard/role.guard';
import { PostDTO } from 'src/DTO/post';

@Controller('post')
export class PostController {
  constructor(private readonly service: PostService) {}

  @UseGuards(new RoleGuard('seller'))
  @Post()
  create(@Body() data: PostDTO) {
    return this.service.create(data);
  }

  @UseGuards(new RoleGuard('seller'))
  @Put()
  update(@Body() data: PostDTO, @Query('id') id: string) {
    return this.service.update(Number(id), data);
  }

  @Get('/all')
  getAll() {
    return this.service.getAll();
  }

  @Get()
  getOne(@Query('id') id: string) {
    return this.service.getOne(Number(id));
  }
}
