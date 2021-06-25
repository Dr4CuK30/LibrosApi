import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateEditorialDto {
  @IsString()
  @Length(1, 255, { message: 'Nombre no valido' })
  nombre: string;

  @IsString()
  @Length(1, 128, { message: 'Dirección no valida' })
  direccion: string;

  @IsEmail({}, { message: 'Email invalido' })
  correo: string;

  @IsPhoneNumber(undefined, { message: 'Numero de telefono no valido' })
  telefono: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  max_libros?: number;
}
