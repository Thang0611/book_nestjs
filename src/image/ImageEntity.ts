import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity } from '../book/book.entity';

@Entity('images')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public url: string;
 
  @Column()
  public key: string;
  // @OneToOne(
  //     () => BookEntity,
  //     (book)=>book.image,
  //     {
  //       eager: true,
  //       nullable: true
  //     }
  //   )
  //   @JoinColumn()
  //   book:BookEntity
}