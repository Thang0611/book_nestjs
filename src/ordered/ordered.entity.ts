import { BookEntity } from "src/book/book.entity";
import { UserEntity } from "src/user/user.entity";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToMany } from 'typeorm';

@Entity("ordered")
export class OrderedEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:number
   
    @OneToOne(
        ()=>UserEntity,
        {
            eager:true   
        }
    )
    @JoinColumn()
    user:UserEntity

    @ManyToMany(
        ()=>BookEntity,
        (book)=>book.ordered,
        {
            eager:true,
            nullable:true  
        }
    )
    @JoinColumn()
    book:BookEntity

}