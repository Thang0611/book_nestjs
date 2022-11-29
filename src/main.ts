import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv' 
dotenv.config()
// import { NextFunction, Request, Response } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true,});
  app.useGlobalPipes(new ValidationPipe());
  console.log(process.env.PORT)
  await app.listen(process.env.PORT);
  app.enableCors();
  app.use(cookieParser())

  }

 
 

bootstrap();
