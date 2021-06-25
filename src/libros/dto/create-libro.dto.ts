import {
  IsInt,
  isObject,
  IsObject,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Editorial } from '../../editoriales/entities/editorial.entity';
import { Autor } from '../../autores/entities/autor.entity';

export class CreateLibroDto {
  @IsString()
  @Length(1, 255, { message: 'El titulo es demasiado largo' })
  titulo: string;

  @IsInt({ message: 'El año debe ser un numero' })
  @Max(new Date().getFullYear(), { message: 'Año no valido' })
  anho: number;

  @IsInt()
  @Min(1, { message: 'El libro debe tener 1 pagina como minimo' })
  paginas: number;

  @IsString()
  genero: string;

  @IsObject()
  editorial: Editorial;

  @IsObject()
  autor: Autor;
}
