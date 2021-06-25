import { PartialType } from '@nestjs/mapped-types';
import { CreateAutorDto } from './create-autor.dto';

export class ParamsAutorDto extends PartialType(CreateAutorDto) {}
