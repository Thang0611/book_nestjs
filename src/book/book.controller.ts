import {
  Controller,
  Get,
  Body,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from '../dto/bookDto';
import { Param, Post, Put } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Req,
  UploadedFile,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { Express } from 'express';
import { Id } from 'aws-sdk/clients/kinesisanalytics';
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  detailBook(@Param() params: { id }) {
    const data = this.bookService.detailBook(params.id);
    return data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  addBook(@Body() bookDto: BookDto, @Res() res) {
    const newBook = this.bookService.create(bookDto);
    newBook
      .then((data) => {
        return res.status(HttpStatus.OK).json({
          data: data,
          message: 'Thêm sách thành công',
        });
      })
      .catch((err) => {
        return res.status(400).json({
          err,
          message: 'Thêm sách thất bại',
        });
      });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  updateBook(
    @Param() params: { id: number },
    @Body() bookDto: BookDto,
    @Res() res,
  ) {
    const book = this.bookService.updateBook(params.id, bookDto);
    console.log(book);
    console.log(0);
    book
      .then((data) => {
        return res.status(HttpStatus.OK).json({
          message: 'Update sách thành công',
        });
      })
      .catch((err) => {
        return res.status(400).json({
          err,
          message: 'Update sách thất bại',
        });
      });
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteBook(@Param() params: { id: number }, @Res() res) {
    const bookDelete = this.bookService.deleteBook(params.id);
    bookDelete
      .then((data) => {
        console.log(data);
        return res.status(HttpStatus.OK).json({
          data,
          message: 'Delete sách thành công',
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          err,
        });
      });
  }
  @Put('/image/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addImage(
    @Req() request,
    @Param() params: { id },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.bookService.addImage(params.id, file.buffer, file.originalname);
  }

  // @Post('/image')
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // async updateImage(@Req() request, @UploadedFile() file: Express.Multer.File) {
  //     const book= this.bookService.updateImage(file.buffer, file.originalname);
  //     return book;
  // }
}
