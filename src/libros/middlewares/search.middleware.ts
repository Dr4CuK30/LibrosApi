import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SearchMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.body = req.query;
    if (req.query.anho) req.body.anho = +req.query.anho;
    if (req.query.paginas) req.body.paginas = +req.query.paginas;
    next();
  }
}
