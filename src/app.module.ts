
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

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      // name:'user',
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'b19dcat187',
      database: 'libraly_app',
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
