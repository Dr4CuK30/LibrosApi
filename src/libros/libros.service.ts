import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLibroDto } from './dto/create-libro.dto';
import { ParamsLibroDto } from './dto/params-libro.dto';
import { Libro } from './entities/libro.entity';

@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro)
    private readonly libroRepo: Repository<Libro>,
  ) {}
  async create(createLibroDto: CreateLibroDto) {
    return await this.libroRepo.save(createLibroDto);
  }

  async findAll(params: ParamsLibroDto) {
    return await this.libroRepo
      .createQueryBuilder('libro')
      .leftJoinAndSelect('libro.autor', 'autor')
      .leftJoinAndSelect('libro.editorial', 'editorial')
      .where(params)
      .getMany();
  }

  async findOne(id: number) {
    return await this.libroRepo
      .createQueryBuilder('libro')
      .leftJoinAndSelect('libro.autor', 'autor')
      .leftJoinAndSelect('libro.editorial', 'editorial')
      .where({ id })
      .getOne();
  }

  async update(id: number, updateLibroDto: ParamsLibroDto) {
    return await this.libroRepo.update(id, updateLibroDto);
  }

  async remove(id: number) {
    return await this.libroRepo.remove([await this.findOne(id)]);
  }
}
