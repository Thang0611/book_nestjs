import { Controller,Get,Body, Delete,UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from '../dto/bookDto';
import { Param, Post ,Put} from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Req, UploadedFile } from '@nestjs/common/decorators/http/route-params.decorator';
import { Express } from 'express';
@Controller('book')
export class BookController {
    constructor (private bookService:BookService){}
    @Get()
    getAllBooks(){
        return this.bookService.getAllBooks()
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/:bookId')
    detailBook(@Param() param:{bookId}){
        return this.bookService.detailBook(param.bookId)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post()
    addBook(@Body() bookDto:BookDto,){
        return this.bookService.create(bookDto)
    }
    @UseGuards(AuthGuard('jwt'))
    @Put('/:bookId')
    updateBook(@Param() params:{bookId:string},@Body() bookDto:BookDto){
        return this.bookService.updateBook(params.bookId,bookDto)
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete("/:bookId")
    deleteBook(@Param() params:{bookId}){
        return this.bookService.deleteBook(params.bookId)
    }
    @Put('/image/:bookId')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async addImage(@Req() request,@Param() params:{bookId}, @UploadedFile() file: Express.Multer.File) {
        return this.bookService.addImage(params.bookId, file.buffer, file.originalname);
    }

    // @Post('/image')
    // @UseGuards(JwtAuthGuard)
    // @UseInterceptors(FileInterceptor('file'))
    // async updateImage(@Req() request, @UploadedFile() file: Express.Multer.File) {
    //     const book= this.bookService.updateImage(file.buffer, file.originalname);
    //     return book;
    // }
}   
