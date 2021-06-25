import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AutoresService } from './autores.service';
import { AutoresController } from './autores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autor } from './entities/autor.entity';
import { CreateMiddleware } from './middlewares/create.middleware';
import { ExisteMiddleware } from './middlewares/existe.middleware';
import { UpdateMiddleware } from 'src/shared/middlewares/update.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Autor])],
  controllers: [AutoresController],
  providers: [AutoresService],
  exports: [AutoresService],
})
export class AutoresModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CreateMiddleware)
      .forRoutes({ path: 'autores', method: RequestMethod.POST });
    consumer
      .apply(UpdateMiddleware, ExisteMiddleware)
      .forRoutes({ path: 'autores/:id', method: RequestMethod.PATCH });
    consumer
      .apply(ExisteMiddleware)
      .forRoutes({ path: 'autores/:id', method: RequestMethod.DELETE });
  }
}
