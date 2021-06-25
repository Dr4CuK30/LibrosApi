import { PartialType } from '@nestjs/mapped-types';
import { CreateEditorialDto } from './create-editorial.dto';

export class ParamsEditorialDto extends PartialType(CreateEditorialDto) {}
