import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Editorial } from '../../editoriales/entities/editorial.entity';
import { Autor } from '../../autores/entities/autor.entity';

@Entity()
export class Libro {
  @PrimaryGeneratedColumn({ name: 'k_id' })
  id: number;

  @Column({ name: 'n_titulo', type: 'varchar' })
  titulo: string;

  @Column({ name: 'i_anho', type: 'int' })
  anho: number;

  @Column({ name: 'i_paginas', type: 'int' })
  paginas: number;

  @Column({ name: 'n_genero', type: 'varchar' })
  genero: string;

  @ManyToOne(() => Editorial, (editorial) => editorial.libros)
  @JoinColumn({ name: 'fk_editorial' })
  editorial: Editorial;

  @ManyToOne(() => Autor, (autor) => autor.libros)
  @JoinColumn({ name: 'fk_autor' })
  autor: Autor;
}
