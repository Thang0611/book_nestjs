import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { BookModule } from './book/book.module';
import { BookEntity } from './book/book.entity';
import { AuthModule } from './auth/auth.module';

import * as dotenv from 'dotenv';

import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { CartModule } from './oder/cart/cart.module';
import { LineItemModule } from './oder/line-item/line-item.module';
import RoleGuard from './auth/guards/role.guard';
import { ImageEntity } from './image/ImageEntity';
import { ImageModule } from './image/image.module';
import { EvaluateModule } from './evaluate/evaluate.module';
import { EvaluateEntity } from './evaluate/evaluate.entity';



dotenv.config();

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'b19dcat187',
      database: 'libraly_app',
      entities: [UserEntity,BookEntity,ImageEntity,EvaluateEntity],
      synchronize: true

      // type: 'mysql',
      // host: process.env.DATABASE_URL,
      // port: 19057,
      // username: process.env.TYPEORM_USERNAME,
      // password: process.env.TYPEORM_PASSWORD,
      // database: process.env.TYPEORM_DATABASE,
      // entities: [UserEntity,BookEntity,ImageEntity],
      // synchronize: true,
      
    }),
    BookModule,
    AuthModule,
    ImageModule,
    CartModule,
    LineItemModule,
    EvaluateModule,
  ],
    controllers: [AppController],
    providers: [AppService,
    //   {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // },
    ],
  })
  
export class AppModule {

}
