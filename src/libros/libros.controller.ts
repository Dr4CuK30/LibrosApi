import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { ParamsLibroDto } from './dto/params-libro.dto';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Post()
  async create(@Body() createLibroDto: CreateLibroDto) {
    return await this.librosService.create(createLibroDto);
  }

  @Get()
  async findAll(@Body() params: ParamsLibroDto) {
    const libros = await this.librosService.findAll(params);
    return { data: libros };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const libro = await this.librosService.findOne(+id);
    if (!libro) {
      throw new HttpException(
        {
          error: 'El libro no está registrado',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return libro;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLibroDto: ParamsLibroDto,
  ) {
    return await this.librosService.update(+id, updateLibroDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.librosService.remove(+id);
  }
}
