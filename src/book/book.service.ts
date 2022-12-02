import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { BookEntity } from './book.entity';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { BookDto } from '../dto/bookDto';
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
        return await this.getById(id)
    }


    async create(bookDto:BookDto,imageBuffer:Buffer, imageName:string):Promise<BookEntity>{
        // if (!bookDto.urlImage) bookDto.urlImage=''
        // addImage(bookDto?.image)
        const book= await this.bookRepository.create(bookDto)
        const image= await this.addImage(imageBuffer, imageName)
        book.image=image;
        console.log(book)
        const data= await this.bookRepository.save(book)
        return data
    }
    

    async updateBook(id,bookDto:BookDto,imageBuffer:Buffer,imageName:string){
        const book= await this.bookRepository.findOneBy({id})
        const imageId=book?.image.id;
        if (!book){
             throw new HttpException("Không tìm thấy sách. Không thể cập nhật",HttpStatus.BAD_REQUEST)
        }
        // const bookUpdate=this.bookRepository.create(bookDto)
        if ((imageBuffer&&imageName)){
            await this.updateImage(id, imageBuffer, imageName)
            await this.imageService.deleteImg(imageId)
            return this.bookRepository.update(id,bookDto)
        }
        return this.bookRepository.update(id,bookDto)


    }

    
    async deleteBook(id){
        const book= await this.bookRepository.findOneBy({id})
        console.log(book)
        const imageId=book?.image?.id
        console.log(imageId)
        if (!book){
            console.log('throw')
            throw new HttpException("Không tìm thấy sách. Không thể Xóa",HttpStatus.BAD_REQUEST)
        }
        const bookDeleted=await this.bookRepository.delete(id)
        await this.imageService.deletePublicFile(imageId)
        return bookDeleted
    }
    async getById(id:number){
        const book=await this.bookRepository.findOne({where:{id:id}})
        return book;
    }

      async addImage( imageBuffer: Buffer, filename: string) {
        const image = await this.imageService.uploadPublicFile(imageBuffer, filename);
        return image;
      }

      async updateImage(id: number, imageBuffer: Buffer, filename: string) {
        const book = await this.getById(id);
        const imageId=book?.image.id;
        if(!book){
            throw new HttpException("Không tim thấy sách.Không thể thêm ảnh",HttpStatus.BAD_REQUEST)
        }
        const image = await this.imageService.uploadPublicFile(imageBuffer, filename);
        // const book = await this.getById(id);
        await this.bookRepository.update(id, {
          ...book,
          image
        });
        if (imageId){
            this.imageService.deleteImg(imageId)
        }
        return image;
      }
        deleteImage(imageId){
            if (imageId){
                this.imageService.deleteImg(imageId)
            }
        }
    //   async deleteImage(id: number) {
    //     // console.log(book)
    //     // const imageId = book.image?.id;
    //     // console.log(imageId)
    //     // if (imageId) {
    //     // await this.bookRepository.update(id, {
    //     //     ...book,
    //     //     image: null
    //     // });
    //     // console.log(imageId)
    //     await this.imageService.deletePublicFile(id)
    //     // await this.imageService.deleteImg(id)
    //     }
  
}
