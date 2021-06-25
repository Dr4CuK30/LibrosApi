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
import { EditorialesService } from './editoriales.service';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { ParamsEditorialDto } from './dto/params-editorial.dto';

@Controller('editoriales')
export class EditorialesController {
  constructor(private readonly editorialesService: EditorialesService) {}

  @Post()
  async create(@Body() createEditorialeDto: CreateEditorialDto) {
    return await this.editorialesService.create(createEditorialeDto);
  }

  @Get()
  async findAll(@Query() data: ParamsEditorialDto) {
    const editoriales = await this.editorialesService.findAll(data);
    return { data: editoriales };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const editorial = await this.editorialesService.findOne(+id);
    if (!editorial) {
      throw new HttpException(
        {
          error: 'La editorial no está registrado',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return editorial;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEditorialeDto: ParamsEditorialDto,
  ) {
    return await this.editorialesService.update(+id, updateEditorialeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.editorialesService.remove(+id);
  }
}
