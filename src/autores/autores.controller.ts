import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AutoresService } from './autores.service';
import { CreateAutorDto } from './dto/create-autor.dto';
import { ParamsAutorDto } from './dto/params-autor.dto';

@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Post()
  async create(@Body() createAutoreDto: CreateAutorDto) {
    return await this.autoresService.create(createAutoreDto);
  }

  @Get()
  async findAll(@Query() x: ParamsAutorDto) {
    const autores = await this.autoresService.findAll(x);
    return { data: autores };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const autor = await this.autoresService.findOne(+id);
    if (!autor) {
      throw new HttpException(
        {
          error: 'El autor no está registrado',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return autor;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAutoreDto: ParamsAutorDto,
  ) {
    return await this.autoresService.update(+id, updateAutoreDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.autoresService.remove(+id);
  }
}
