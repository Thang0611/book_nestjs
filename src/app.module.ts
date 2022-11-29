
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { DataSource } from 'typeorm';
import { BookModule } from './book/book.module';
import { BookEntity } from './book/book.entity';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      
      // type: 'mysql',
      // host: '',
      // port: 3306,
      // username: 'root',
      // password: 'b19dcat187',
      // database: 'libraly_app',
      // entities: [UserEntity,BookEntity],
      // synchronize: true

      type: 'mysql',
      host: process.env.DATABASE_URL,
      port: 19057,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [UserEntity,BookEntity],
      synchronize: true
    }),
    BookModule,
    AuthModule,
    ImageModule,
  ],
    controllers: [AppController],
    providers: [AppService],
  })
  
export class AppModule {

}
