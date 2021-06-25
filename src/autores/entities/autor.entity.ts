import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Libro } from '../../libros/entities/libro.entity';

@Entity()
export class Autor {
  @PrimaryGeneratedColumn({ name: 'k_id' })
  id: number;

  @Column({ name: 'n_nombre', type: 'varchar' })
  nombre: string;

  @Column({ name: 'n_ciudad', type: 'varchar' })
  ciudad: string;

  @Column({ name: 'n_correo', type: 'varchar', unique: true })
  correo: string;

  @Column({ name: 'f_nacimiento', type: 'date' })
  fecha: Date;

  @OneToMany(() => Libro, (libro) => libro.autor)
  libros: Libro[];
}
