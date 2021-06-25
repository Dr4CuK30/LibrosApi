import {
  IsDateString,
  IsEmail,
  IsString,
  Length,
  MaxDate,
} from 'class-validator';

export class CreateAutorDto {
  private date: Date = new Date();
  @IsString()
  @Length(1, 255, { message: 'El nombre es demasiado largo' })
  nombre: string;

  @IsString()
  @Length(1, 58, { message: 'El nombre de la ciudad es demasiado largo' })
  ciudad: string;

  @IsEmail({}, { message: 'Este no es un correo valido' })
  correo: string;

  @IsDateString()
  fecha: Date;
}
