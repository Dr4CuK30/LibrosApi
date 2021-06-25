import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AutoresService } from '../../autores/autores.service';
import { EditorialesService } from '../../editoriales/editoriales.service';

@Injectable()
export class CreateMiddleware implements NestMiddleware {
  constructor(
    private readonly autorService: AutoresService,
    private readonly editorialesService: EditorialesService,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    var { id_autor, id_editorial, ...body } = req.body;
    if (typeof id_autor != 'number' || typeof id_editorial != 'number') {
      return res.status(400).json({ error: 'Autor y/o Editorial no validos' });
    }
    this.autorService.findOne(id_autor).then((autor) => {
      if (!autor) {
        return res.status(400).json({ error: 'El autor no está registrado' });
      }
      this.editorialesService.findOne(id_editorial).then((editorial) => {
        if (!editorial) {
          return res
            .status(400)
            .json({ error: 'La editorial no está registrada' });
        }
        if (
          editorial.max_libros != -1 &&
          editorial.max_libros <= editorial.total_libros
        ) {
          return res.status(400).json({
            error:
              'No es posible registrar el libro, alcanzo el maximo permitido',
          });
        }
        req.body = { autor: autor, editorial: editorial, ...body };
        next();
      });
    });
  }
}
