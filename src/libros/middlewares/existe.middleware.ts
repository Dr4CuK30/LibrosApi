import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LibrosService } from '../libros.service';

@Injectable()
export class ExisteMiddleware implements NestMiddleware {
  constructor(private readonly librosService: LibrosService) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.librosService.findOne(+req.params.id).then((libro) => {
      if (!libro) {
        return res.status(400).json({ error: 'No existe libro con este ID' });
      }
      next();
    });
  }
}
