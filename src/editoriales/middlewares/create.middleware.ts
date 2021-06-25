import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EditorialesService } from '../editoriales.service';

@Injectable()
export class CreateMiddleware implements NestMiddleware {
  constructor(private readonly editorialesService: EditorialesService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { correo } = req.body;
    this.editorialesService.findAll({ correo: correo }).then((editorial) => {
      if (editorial.length != 0) {
        return res
          .status(400)
          .json({ error: 'Ya hay una editorial con este correo' });
      }
      next();
    });
  }
}
