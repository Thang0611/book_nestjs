import { Injectable, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { BookEntity } from './book.entity';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { BookDto } from '../dto/bookDto';
import { ImageService } from 'src/image/image.service';
import { throws } from 'assert';
import { timeStamp } from 'console';
import { AddReviewDto } from '../dto/addReviewDto';
import { ReviewService } from '../review/review.service';
import { imageDto } from 'src/dto/imageDto';
@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private bookRepository:Repository<BookEntity>,
        private imageService:ImageService,
        private evaluateService:ReviewService
    ){}


    async getAllBooks(){
        const book= await this.bookRepository.find()
        console.log(book)
        return book
    }
    async detailBook(id){
        return await this.getById(id)
    }


    async create(bookDto:BookDto,imageBuffer:Buffer, imageName:string){
        const book= await this.bookRepository.create(bookDto)
        // const data= await this.bookRepository.save(book)
        const image= await this.addImage(imageBuffer, imageName)
        book.image=image;
        console.log(book)
        const data= await this.bookRepository.save(book)
        return data
    }
    

    async updateBookAndImage (id,bookDto:BookDto,imageBuffer:Buffer,imageName:string){
        const book= await this.bookRepository.findOneBy({id})
        if (!book){
             throw new HttpException("Không tìm thấy sách. Không thể cập nhật",HttpStatus.BAD_REQUEST)
        }
        const bookUpdate=this.bookRepository.create(bookDto)
        if ((imageBuffer&&imageName)){
            console.log('update ...')
            const image = await this.updateImage(id, imageBuffer, imageName)
            console.log("update image done")
             await this.bookRepository.update(id,bookUpdate)
            console.log('update book done')
            return this.bookRepository.findOneBy({id})
        }
        
        return this.bookRepository.update(id,bookUpdate)


    }

    async updateBook (id,bookDto:BookDto){
        const book= await this.bookRepository.findOneBy({id})
        console.log(id)
        console.log('id')
        console.log(book?.image)
        if (!book){
             throw new HttpException("Không tìm thấy sách. Không thể cập nhật",HttpStatus.BAD_REQUEST)
        }
        const bookUpdate=this.bookRepository.create(bookDto)
        const img=await this.imageService.findById(book?.image?.id)
        console.log(img)
        bookUpdate.image=img;
        console.log(bookUpdate)
        return this.bookRepository.update(id,bookUpdate)


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

      async addImage(imageBuffer: Buffer, filename: string) {
        const image = await this.imageService.uploadPublicFile(imageBuffer, filename);
        await this.imageService.createImg(image);
        return image;
      }

      async updateImage(id: number, imageBuffer: Buffer, filename: string) {
        
        const book = await this.getById(id);

        // console.log(book)
        const imageId=book?.image?.id;
        // console.log(book?.image.id)
        if(!book){
            throw new HttpException("Không tim thấy sách.Không thể thêm ảnh",HttpStatus.BAD_REQUEST)
        }
        const image = await this.imageService.uploadPublicFile(imageBuffer, filename);
        // book.image=image;

        // await this.bookRepository.update(id, {
        //   ...book,
        //   image 
        // });
        if(imageId)
            this.imageService.updateImg(imageId,image);
        // if (imageId){
        //     this.imageService.deleteImg(imageId)
        // }

                // await this.bookRepository.update(id, {
        //   ...book,
        //   image 
        // });
        return image;
      }



        deleteImage(imageId){
            if (imageId){
                this.imageService.deleteImg(imageId)
            }
        }


        async addReview(id:number,evaluate:AddReviewDto){
            const book=await this.getById(id);
            const bookid=book.id
            if (!book){
                throw new NotFoundException("Khong tim thay sach.Khong the danh gia")
            }
            const newReview= await this.evaluateService.createReview(book,evaluate)
            return  newReview
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
