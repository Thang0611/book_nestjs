import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { BookEntity } from './book.entity';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { BookDto } from '../dto/bookDto';
import { ImageEntity } from 'src/image/ImageEntity';
import { ImageService } from 'src/image/image.service';
@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private bookRepository:Repository<BookEntity>,
        private imageService:ImageService
    ){}


    async getAllBooks(){
        return await this.bookRepository.find()
    }
    async detailBook(id){
        return await this.bookRepository.findOne({where:{id}})
    }


    async create(bookDto:BookDto):Promise<BookEntity>{
        // if (!bookDto.urlImage) bookDto.urlImage=''
        const book= await this.bookRepository.create(bookDto)
        const data= await this.bookRepository.save(book)
        console.log(data)
        return data
    }
    

    async updateBook(id,bookDto:BookDto){
        // const bookUpdate=this.bookRepository.create(bookDto);
        
        const book= await this.bookRepository.findOneBy({id})
        if (!book){
             throw new HttpException("Không tìm thấy sách. Không thể cập nhật",HttpStatus.BAD_REQUEST)
        }
        return this.bookRepository.update(id,bookDto)
    }

    
    async deleteBook(id){
        const book= await this.bookRepository.findOneBy({id})
        if (!book){
            console.log('throw')
            throw new HttpException("Không tìm thấy sách. Không thể Xóa",HttpStatus.BAD_REQUEST)
        }
        return this.bookRepository.delete(id)
    }
    async   getById(id:number){
        const book=await this.bookRepository.findOne({where:{id:id}})
        return book;
    }

    // async updateImage(imageBuffer: Buffer, filename: string) {
    //     const image = await this.imageService.uploadPublicFile(imageBuffer, filename);
    //     return image;
    // }

      async addImage(id: number, imageBuffer: Buffer, filename: string) {
       
        const image = await this.imageService.uploadPublicFile(imageBuffer, filename);
        const book = await this.getById(id);
        await this.bookRepository.update(id, {
          ...book,
          image
        });
        return image;
      }
      async update(id: number, imageBuffer: Buffer, filename: string) {
        const bookfind=this.bookRepository.findOneBy({id})
        if(!bookfind){
            throw new HttpException("Không tim thấy sách.Không thể thêm ảnh",HttpStatus.BAD_REQUEST)
        }
        const image = await this.imageService.uploadPublicFile(imageBuffer, filename);
        const book = await this.getById(id);
        await this.bookRepository.update(id, {
          ...book,
          image
        });
        return image;
      }
}
