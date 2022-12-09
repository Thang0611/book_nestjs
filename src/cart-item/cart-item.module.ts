import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity } from './cart-item.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CartItemEntity])],
  providers: [CartItemService],
  controllers: [CartItemController]
})
export class CartItemModule {}
