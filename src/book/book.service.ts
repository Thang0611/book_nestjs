import { Injectable } from '@nestjs/common';
import { BookEntity } from './book.entity';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { BookDto } from '../dto/bookDto';
@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private bookRepository:Repository<BookEntity>
    ){}
    getAllBooks(){
        return this.bookRepository.find()
    }
    detailBook(bookId){
        return this.bookRepository.findOne({where:{bookId}})
    }
    async create(bookDto:BookDto){
        
        if (!bookDto.urlImage) bookDto.urlImage=''
        const book=await this.bookRepository.create(bookDto)
        console.log(book)
        const data=await this.bookRepository.save(book)
        
        if(data){
            console.log(bookDto)
            return {
                success:true,
                msg:'Thêm sách thành công'
            }
        }
        else{
            console.log("err")
            return {
                success:false,
                msg:'Thêm sách thất bại'
            }
        }
    }
    
    updateBook(bookId,bookDto:BookDto){
        const bookUpdate =this.bookRepository.update({bookId},bookDto)
        if (bookUpdate){
            return {
                success:true,
                msg:'update thành công'
            }
        }
        else {
            return {
                success:false,
                msg:'update thất bại'
                
            }
        }
        
    }
    async deleteBook(bookId){
        const deleteBook= await this.bookRepository.delete(bookId)
        if (deleteBook){
            return {
                success:true,
                msg:'Xóa sách thành công'
            }
        }
        else {
            return {
                success:false,
                msg:'Xóa sách thất bại !!'
            }
        }
        
        // this.bookRepository.findOne({where:{bookId}})
        // .then(data=>{
        //     console.log(data)
        //     return {
        //         data,
        //         success:true
        //     }
        // })
        // .catch(err=>{
        //     console.log(err)
        //     return {
        //         err:true,
        //         success:false
        //     }
        // })
    }
}
