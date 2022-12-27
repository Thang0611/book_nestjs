import { BookEntity } from "src/book/book.entity";
import { UserEntity } from "src/user/user.entity";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToMany, ManyToOne, JoinTable } from 'typeorm';

@Entity("orders")
export class OrderEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column()
    amount:number;
    @ManyToOne(
        ()=>UserEntity,
        (user:UserEntity)=>user.order,
        {
            eager:true,
            nullable:true     
        }
    )
    // @JoinColumn()
    user:UserEntity

    // @ManyToMany(
    //     ()=>BookEntity,
    //     (book)=>book.order,
    //     {
    //         eager:true,
    //         nullable:true  
    //     }
    // )
    // @JoinTable()
    // book:BookEntity;

        @OneToOne(
        ()=>BookEntity,
        {
            eager:true,
            nullable:true, 
            createForeignKeyConstraints: false,
        })
        @JoinColumn()    
        book:BookEntity;

}