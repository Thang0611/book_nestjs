import { Transform } from 'class-transformer';
import moment from 'moment';
import { EvaluateEntity } from 'src/evaluate/evaluate.entity';
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, JoinColumn, OneToOne, OneToMany } from 'typeorm';
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
      ()=>EvaluateEntity,
      (evaluate)=>evaluate.book,
      {
        eager:true,
        cascade: true,
        onDelete:"CASCADE"

      }
    
    )
    public evaluates?:EvaluateEntity[];
}