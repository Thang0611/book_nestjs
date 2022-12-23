import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderedEntity } from './ordered.entity';
import { OrderedService } from './ordered.service';
import { OrderedController } from './ordered.controller';
import { BookModule } from '../book/book.module';
import { UserModule } from '../user/user.module';

@Module({
    imports:[TypeOrmModule.forFeature([OrderedEntity]),BookModule,UserModule],
    providers:[OrderedService],
    controllers:[OrderedController],
    exports:[OrderedService]

})
export class OrderedModule {}
