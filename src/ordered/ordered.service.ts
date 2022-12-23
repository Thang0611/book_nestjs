import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderedEntity } from './ordered.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { BookService } from '../book/book.service';

@Injectable()
export class OrderedService {
    constructor(
        @InjectRepository(OrderedEntity)
        private orderedRepository:Repository<OrderedEntity>,
        private userService:UserService,
        private bookService:BookService
    ){}
    async addToOrder(){
        return 
    }
}
