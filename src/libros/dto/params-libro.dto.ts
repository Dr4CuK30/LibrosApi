import { PartialType } from '@nestjs/mapped-types';
import { CreateLibroDto } from './create-libro.dto';

export class ParamsLibroDto extends PartialType(CreateLibroDto) {}
