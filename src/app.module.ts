import { Module } from '@nestjs/common';
import { LibrosModule } from './libros/libros.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoresModule } from './autores/autores.module';
import { EditorialesModule } from './editoriales/editoriales.module';

@Module({
  imports: [
    LibrosModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'pruebaswork.database.windows.net',
      username: 'root1',
      password: 'Pass1234',
      database: 'prueba_tec',
      entities: [__dirname + './**/**/*entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    AutoresModule,
    EditorialesModule,
  ],
})
export class AppModule {}
