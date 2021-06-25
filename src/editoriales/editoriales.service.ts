import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { ParamsEditorialDto } from './dto/params-editorial.dto';
import { Editorial } from './entities/editorial.entity';

@Injectable()
export class EditorialesService {
  constructor(
    @InjectRepository(Editorial)
    private readonly editorialRepo: Repository<Editorial>,
  ) {}

  async create(createEditorialeDto: CreateEditorialDto) {
    return await this.editorialRepo.save(createEditorialeDto);
  }

  async findAll(params: ParamsEditorialDto) {
    let editoriales = await this.editorialRepo
      .createQueryBuilder('editorial')
      .leftJoinAndSelect('editorial.libros', 'libros')
      .leftJoinAndSelect('libros.autor', 'autor')
      .where(params)
      .getMany();
    return editoriales.map((editorial) => {
      if (!editorial.max_libros) {
        editorial.max_libros = -1;
      }
      return editorial;
    });
  }

  async findOne(id: number) {
    let editorial = await this.editorialRepo
      .createQueryBuilder('editorial')
      .leftJoinAndSelect('editorial.libros', 'libros')
      .leftJoinAndSelect('libros.autor', 'autor')
      .where({ id })
      .getOne();
    if (editorial && !editorial.max_libros) {
      editorial.max_libros = -1;
    }
    return editorial;
  }

  async update(id: number, updateEditorialeDto: ParamsEditorialDto) {
    return await this.editorialRepo.update(id, updateEditorialeDto);
  }

  async remove(id: number) {
    return await this.editorialRepo.remove([
      await this.editorialRepo.findOne(id),
    ]);
  }
}
