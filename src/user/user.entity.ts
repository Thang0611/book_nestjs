import { BaseEntity, BeforeInsert, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from'bcryptjs';
import { Role } from "src/auth/emuns/role.enum";
import { CartEntity } from "src/cart/cart.entity";

@Entity('users')
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username : string;
    @Column()
    password:string;
    @Column()
    fullname:string;
    @Column()
    email:string;

    @OneToOne(
      ()=>CartEntity, 
      cart=>cart.user
    )
    cart:CartEntity
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
      })
      public role: Role

    // @BeforeInsert()
    // async hashPassword(){
    //     this.password= await bcrypt.hash(this.password,10)
    // }
    // async validatePassword(password:string):Promise<boolean>{
    //     return bcrypt.compare(password,this.password);
    // }
   
}