import { Transform } from 'class-transformer';
import moment from 'moment';
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, JoinColumn, OneToOne } from 'typeorm';
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
      {
        eager: true,
        nullable: true
      }
    )
    public image?: ImageEntity;
}