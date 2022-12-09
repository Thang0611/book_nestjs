import { Transform } from 'class-transformer';
import moment from 'moment';
import { CartItemEntity } from 'src/cart-item/cart-item.entity';
import { CartEntity } from 'src/cart/cart.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, JoinColumn, OneToOne, OneToMany, ManyToMany } from 'typeorm';
import { ImageEntity } from '../image/ImageEntity';
@Entity('books')
export class BookEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:number;
    @Column()
    title:string;
    @Column()
    author:string;
    @Column()
    category:string;
    @Column('date') 
    date:Date; 
    @Column({})
    numOfPage:number;
    @Column('longtext')
    decription:string;
    @Column()
    amount:number
    @JoinColumn()
    @OneToOne(
      () => ImageEntity,
      // (image) => image.book,
      {
        eager: true,
        nullable: true
      }
    )
    public image?: ImageEntity;
    @JoinColumn()
    @OneToMany(
      ()=>ReviewEntity,
      (evaluate)=>evaluate.book,
      {
        eager:true,
        cascade: true,
        onDelete:"CASCADE"

      }
    
    )
    public reviews?:ReviewEntity[];
    // @ManyToMany(
    //   ()=>CartEntity,
    //   cart=>cart.books
    //   )
    //   cart:CartEntity[]
    @OneToMany(
      ()=>CartItemEntity,
      cartItem=>cartItem.book
    )
    cartItem:CartItemEntity[]
}