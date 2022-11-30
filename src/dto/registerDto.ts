import { IsEmail, IsNotEmpty, IsString, } from "class-validator";

export class registerDto{

    @IsNotEmpty()
    username : string;

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    passwordcf:string;

    @IsNotEmpty()
    fullname:string;
    @IsEmail()
    @IsNotEmpty()
    email:string;
    // @IsString()
    // role:string
}