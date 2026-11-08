import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import type { Film } from './films.service';
import { CreateFilmDto } from './DTO/create-film.dto';
import { UpdateFilmDto } from './DTO/update-film.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getAll(@Query('ditonton') ditonton?: string): Film[] {
    return this.filmsService.findAll(ditonton);
  }

  @Get(':id')
  getOne(@Param('id') id: string): Film {
    return this.filmsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateFilmDto): Film {
    return this.filmsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFilmDto): Film {
    return this.filmsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmsService.remove(id);
  }
}