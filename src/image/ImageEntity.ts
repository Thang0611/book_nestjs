import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('images')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  public Id: number;
 
  @Column()
  public url: string;
 
  @Column()
  public key: string;
}