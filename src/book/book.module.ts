import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { ImageModule } from '../image/image.module';

@Module({
  imports:[TypeOrmModule.forFeature([BookEntity]),ImageModule],
  providers: [BookService],
  controllers: [BookController]
})
export class BookModule {}
