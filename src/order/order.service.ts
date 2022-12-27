import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { UserService } from '../user/user.service';
import { BookService } from '../book/book.service';
import { OrderEntity } from './order.entity';
import { OrderDto } from 'src/dto/orderDto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity) private orderRepository:Repository<OrderEntity>,
        @InjectDataSource() private dataSource:DataSource,
        private userService:UserService,
        private bookService:BookService
    ){}
    async addToOrder(order:OrderDto,){
        const book=await this.bookService.detailBook(order.bookId)
        const user= await this.userService.findUserById(order.userId)
        const amountBook=book.amount
        if(order.amount>amountBook) {
            throw new HttpException(["Không đủ số lượng sách để cho mượn!!"],HttpStatus.BAD_REQUEST)
        } 
        const newOrder=this.orderRepository.create()
        newOrder.book=book;
        newOrder.user=user
        newOrder.amount=order.amount
        console.log(newOrder)
        return this.orderRepository.save(newOrder)
        
    }
    async getOrder(id:string){
        // const book=await this.orderRepository.find({where:{userId:id}})
        const book=this.dataSource
        .createQueryBuilder(OrderEntity,'orders')
        .leftJoinAndSelect('orders.user','user')
        .leftJoinAndSelect('orders.book','book')
        .select(['orders.id','orders.amount','user.username','user.fullname','book',])
        .getMany()
        console.log(book)
        return book;
    }
    async getById(id:string){
        const book=await this.orderRepository.findOne({where:{id:id}})
        return book;
    }
}
