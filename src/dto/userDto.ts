import { IsEmail, IsString, } from "class-validator";
import { Role } from "src/auth/emuns/role.enum";

export class UserDto{
    @IsString()
    username : string;
    @IsString()
    password:string;
    @IsString()
    fullname:string;
    @IsEmail()
    email:string;

    role:Role
}