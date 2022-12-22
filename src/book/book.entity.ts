import { Transform } from 'class-transformer';
import moment from 'moment';
import { CartItemEntity } from 'src/cart-item/cart-item.entity';
import { CartEntity } from 'src/cart/cart.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, JoinColumn, OneToOne, OneToMany, ManyToMany, RelationId } from 'typeorm';
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
    @Column()
    publishingCompany:string;
    @Column('date') 
    date:Date; 
    @Column({})
    numOfPage:number;
    @Column('longtext')
    decription:string;
    @Column()
    amount:number
    
    @OneToOne(
      () => ImageEntity,
      // (image) => image.book,
      {
        eager: true,
        nullable: true
      }
    )
    @JoinColumn()
    public image?: ImageEntity;
    // @RelationId((book: BookEntity) => book.reviews)
    
    @OneToMany(
      ()=>ReviewEntity,
      (evaluate)=>evaluate.book,
      {
        eager:true,
        cascade: true,
        onDelete:"CASCADE"

      }
    
    )
    // @JoinColumn()
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