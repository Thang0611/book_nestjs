import { IsEmail, IsNotEmpty, IsString, } from "class-validator";

export class registerDto{
    @IsString()
    @IsNotEmpty()
    username : string;
    @IsString()
    @IsNotEmpty()
    password:string;
    @IsString()
    @IsNotEmpty()
    passwordcf:string;
    @IsString()
    @IsNotEmpty()
    fullname:string;
    @IsEmail()
    @IsNotEmpty()
    email:string;
    // @IsString()
    role:string
}