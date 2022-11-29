import { Controller,Get,Body, Delete,UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from '../dto/bookDto';
import { Param, Post ,Put} from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';

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
    addBook(@Body() bookDto:BookDto ){
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
}
