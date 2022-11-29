import { Transform } from 'class-transformer';
import moment from 'moment';
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn } from 'typeorm';
@Entity('books')
export class BookEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    bookId:string;
    @Column()
    title:string;
    @Column()
    author:string;
    @Column()
    category:string;
    // @Type(() => Date)
    // @Transform(value => value.valueOf(), { toPlainOnly: true })
    // @Transform(date => {moment(date).format('DD/MM/YY')})
    @Column('date') 
    date:Date; 
    @Column({})
    numOfPage:number;
    @Column('longtext')
    detail:string;
    @Column()
    amount:number
    @Column({type: "blob"})
    urlImage:string;
}