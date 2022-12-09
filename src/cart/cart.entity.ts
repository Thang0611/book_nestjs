import { BookEntity } from "src/book/book.entity";
import { UserEntity } from "src/user/user.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { CartItemEntity } from '../cart-item/cart-item.entity';

@Entity('cart')
export class CartEntity extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id:number
    // @JoinTable()
    // @ManyToMany(
    //     ()=>BookEntity,
    //     book=>book.cart
    //     )
    // books:BookEntity[]
    @JoinColumn()
    @OneToOne(
        ()=>UserEntity,
        user=>user.cart
    )
    user:UserEntity
    @OneToMany(
        ()=>CartItemEntity,
        cartItem=>cartItem.cart
    )
    cartItem:CartItemEntity[]
}