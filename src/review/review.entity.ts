import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BookEntity } from '../book/book.entity';
import { UserEntity } from '../user/user.entity';
import { Exclude } from 'class-transformer';

@Entity("reviews")
export class ReviewEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:string;
    @Column()
    star:number;
    @Column()
    comment:string;
    // @Column('date') 
    // date:Date; 
    // create_at:string;
    
    
    @ManyToOne(
        () => UserEntity,
        (user:UserEntity)=>user.review,
        {
            onDelete:"SET NULL",
            eager:true,
        }
      )
    @JoinColumn()
    user: UserEntity;
    // @Column()
    // userId:number;

    // @JoinColumn()
    @ManyToOne(
        ()=>BookEntity,
        (book)=>book.reviews,
        {
            onDelete:"SET NULL",
        // eager:true,
        }
    )
    @JoinColumn()
    book:BookEntity;
}