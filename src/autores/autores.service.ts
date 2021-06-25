import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAutorDto } from './dto/create-autor.dto';
import { ParamsAutorDto } from './dto/params-autor.dto';
import { Autor } from './entities/autor.entity';

@Injectable()
export class AutoresService {
  constructor(
    @InjectRepository(Autor)
    private readonly autorRepo: Repository<Autor>,
  ) {}

  async create(createAutoreDto: CreateAutorDto) {
    return await this.autorRepo.save(createAutoreDto);
  }

  async findAll(params?: ParamsAutorDto): Promise<Autor[]> {
    return await this.autorRepo
      .createQueryBuilder('autor')
      .leftJoinAndSelect('autor.libros', 'libros')
      .leftJoinAndSelect('libros.editorial', 'editorial')
      .where(params)
      .getMany();
  }

  async findOne(id: number) {
    return await this.autorRepo
      .createQueryBuilder('autor')
      .leftJoinAndSelect('autor.libros', 'libros')
      .leftJoinAndSelect('libros.editorial', 'editorial')
      .where({ id })
      .getOne();
  }

  async update(id: number, updateAutoreDto: ParamsAutorDto) {
    return await this.autorRepo.update(id, updateAutoreDto);
  }

  async remove(id: number) {
    return await this.autorRepo.remove([await this.findOne(id)]);
  }
}
