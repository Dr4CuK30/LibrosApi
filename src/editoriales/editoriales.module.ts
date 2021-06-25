import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { EditorialesService } from './editoriales.service';
import { EditorialesController } from './editoriales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Editorial } from './entities/editorial.entity';
import { CreateMiddleware } from './middlewares/create.middleware';
import { ExisteMiddleware } from './middlewares/existe.middleware';
import { UpdateMiddleware } from 'src/shared/middlewares/update.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Editorial])],
  controllers: [EditorialesController],
  providers: [EditorialesService],
  exports: [EditorialesService],
})
export class EditorialesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CreateMiddleware)
      .forRoutes({ path: 'editoriales', method: RequestMethod.POST });
    consumer
      .apply(ExisteMiddleware)
      .forRoutes({ path: 'editoriales/:id', method: RequestMethod.DELETE });
    consumer
      .apply(ExisteMiddleware, UpdateMiddleware)
      .forRoutes({ path: 'editoriales/:id', method: RequestMethod.PATCH });
  }
}
