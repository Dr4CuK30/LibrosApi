import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Libro } from '../../libros/entities/libro.entity';

@Entity()
export class Editorial {
  @PrimaryGeneratedColumn({ name: 'k_id', type: 'int' })
  id: number;

  @Column({ name: 'n_nombre', type: 'varchar' })
  nombre: string;

  @Column({ name: 'n_direccion', type: 'varchar' })
  direccion: string;

  @Column({ name: 'n_correo', type: 'varchar', unique: true })
  correo: string;

  @Column({ name: 'n_telefono', type: 'varchar' })
  telefono: string;

  @Column({ name: 'i_max_libros', type: 'int', nullable: true })
  max_libros?: number;

  @Column({ name: 'i_total_actual', type: 'int', default: 0 })
  total_libros: number;

  @OneToMany(() => Libro, (libro) => libro.editorial)
  libros: Libro[];
}
