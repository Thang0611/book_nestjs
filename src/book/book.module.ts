import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { ImageModule } from '../image/image.module';
import { EvaluateModule } from '../evaluate/evaluate.module';

@Module({
  imports:[TypeOrmModule.forFeature([BookEntity]),ImageModule,EvaluateModule],
  providers: [BookService],
  controllers: [BookController]
})
export class BookModule {}
