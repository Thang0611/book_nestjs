import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BookEntity } from '../book/book.entity';
import { UserEntity } from '../user/user.entity';

@Entity("evaluate")
export class EvaluateEntity extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id:number;
    @Column()
    star:number;
    @Column()
    comment:string;
    // @Column('date') 
    // date:Date; 
    // create_at:string;
    
    // @JoinColumn()
    // @OneToOne(
    //     () => UserEntity,
    //   )
    // user: UserEntity;
    @Column()
    userId:number;

    @JoinColumn()
    @ManyToOne(
        ()=>BookEntity,
        (book)=>book.evaluates,
        {onDelete:"SET NULL"}
    )
    book:BookEntity;
}