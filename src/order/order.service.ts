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
        const order=this.dataSource
        .createQueryBuilder(OrderEntity,'orders')
        .leftJoinAndSelect('orders.user','user')
        .leftJoinAndSelect('orders.book','books')
        .select(['orders.id','orders.amount','user.username','user.fullname','books'])
        .where("orders.userId= :id",{id})
        .getMany()
        return order;
    }
    async deleteOrder(id:string){
        const order=await this.orderRepository.findOne({where:{id}})
        if (!order) throw new HttpException("Không tìm thấy order này!",HttpStatus.BAD_REQUEST)
        console.log(id)
        return await this.orderRepository.delete(id)
    }
    async getById(id:string){
        const book=await this.orderRepository.findOne({where:{id:id}})
        return book;
    }
}
