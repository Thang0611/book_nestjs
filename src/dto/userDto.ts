import { IsEmail, IsString, } from "class-validator";

export class UserDto{
    @IsString()
    username : string;
    @IsString()
    password:string;
    @IsString()
    fullname:string;
    @IsEmail()
    email:string;
    role:string
}