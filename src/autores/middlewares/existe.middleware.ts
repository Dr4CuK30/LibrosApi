import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AutoresService } from '../autores.service';

@Injectable()
export class ExisteMiddleware implements NestMiddleware {
  constructor(private readonly autoresService: AutoresService) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.autoresService.findOne(+req.params.id).then((autor) => {
      if (!autor) {
        return res.status(400).json({ error: 'No existe autor con este ID' });
      }
      next();
    });
  }
}
