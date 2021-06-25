import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EditorialesService } from '../editoriales.service';

@Injectable()
export class ExisteMiddleware implements NestMiddleware {
  constructor(private readonly editorialesService: EditorialesService) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.editorialesService.findOne(+req.params.id).then((editorial) => {
      if (!editorial) {
        return res
          .status(400)
          .json({ error: 'No existe editorial con este ID' });
      }
      next();
    });
  }
}
