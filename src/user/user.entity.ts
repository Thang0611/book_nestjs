import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from'bcryptjs';
import { Role } from "src/auth/emuns/role.enum";

@Entity('users')
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    userid: number;
    @Column()
    username : string;
    @Column()
    password:string;
    @Column()
    fullname:string;
    @Column()
    email:string;
    @Column({default:"user"})
        roles: Role;

    // @BeforeInsert()
    // async hashPassword(){
    //     this.password= await bcrypt.hash(this.password,10)
    // }
    // async validatePassword(password:string):Promise<boolean>{
    //     return bcrypt.compare(password,this.password);
    // }
   
}