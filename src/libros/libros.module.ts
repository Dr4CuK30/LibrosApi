import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';
import { UpdateMiddleware } from '../shared/middlewares/update.middleware';
import { ExisteMiddleware } from './middlewares/existe.middleware';
import { CreateMiddleware } from './middlewares/create.middleware';
import { AutoresService } from '../autores/autores.service';
import { EditorialesService } from '../editoriales/editoriales.service';
import { EditorialesModule } from '../editoriales/editoriales.module';
import { AutoresModule } from '../autores/autores.module';
import { SearchMiddleware } from './middlewares/search.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Libro]),
    EditorialesModule,
    AutoresModule,
  ],
  controllers: [LibrosController],
  providers: [LibrosService],
})
export class LibrosModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExisteMiddleware)
      .forRoutes({ path: 'libros/:id', method: RequestMethod.DELETE });
    consumer
      .apply(ExisteMiddleware, UpdateMiddleware)
      .forRoutes({ path: 'libros/:id', method: RequestMethod.PATCH });
    consumer
      .apply(CreateMiddleware)
      .forRoutes({ path: 'libros', method: RequestMethod.POST });
    consumer
      .apply(SearchMiddleware)
      .forRoutes({ path: 'libros', method: RequestMethod.GET });
  }
}
