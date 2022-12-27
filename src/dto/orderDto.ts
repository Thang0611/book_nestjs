import { IsNotEmpty, Min } from "class-validator";
import { UserEntity } from '../user/user.entity';
import { BookEntity } from "src/book/book.entity";

export class OrderDto{
    @IsNotEmpty({message:'Người dùng không xác định!'})
    userId:string   
    @IsNotEmpty({message:'Sách không xác định!'})
    bookId:string
    @IsNotEmpty({message:'Số lượng không xác định!'})
    @Min(1,{message:'Số lượng nhỏ nhất là 1'})
    amount:number
}