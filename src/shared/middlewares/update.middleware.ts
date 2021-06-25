import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UpdateMiddleware implements NestMiddleware {
  constructor() {}
  use(req: Request, res: Response, next: NextFunction) {
    if (Object.keys(req.body).length == 0) {
      return res
        .status(400)
        .json({ error: 'No ha ingresado los datos a actualizar' });
    }
    next();
  }
}
