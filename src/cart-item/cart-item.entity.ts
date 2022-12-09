import { BookEntity } from "src/book/book.entity";
import { CartEntity } from "src/cart/cart.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cartitem')
export class CartItemEntity extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id:number   
    @JoinColumn()
    @ManyToOne(
        ()=>BookEntity,
        book=>book.cartItem
    )
    book:BookEntity
    @Column()
    qty:number
    @JoinColumn()
    @ManyToOne(
        ()=>CartEntity,
        cart=>cart.cartItem
    )
    cart:CartEntity
}