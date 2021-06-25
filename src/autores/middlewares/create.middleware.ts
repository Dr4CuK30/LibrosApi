import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AutoresService } from '../autores.service';

@Injectable()
export class CreateMiddleware implements NestMiddleware {
  constructor(private readonly autoresService: AutoresService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { correo } = req.body;
    this.autoresService.findAll({ correo: correo }).then((autor) => {
      if (autor.length != 0) {
        return res
          .status(400)
          .json({ error: 'Ya hay un autor con este correo' });
      }
      next();
    });
  }
}
