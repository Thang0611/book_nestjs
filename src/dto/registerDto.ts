import { IsEmail, IsNotEmpty, IsString, } from "class-validator";

export class registerDto{

    @IsNotEmpty({message:'Username không được để trống '})
    username : string;

    @IsNotEmpty({message:'Password không được để trống '})
    password:string;

    @IsNotEmpty({message:'Nhập lại Password không được để trống '})
    passwordcf:string;

    @IsNotEmpty({message:'Username không được để trống '})
    fullname:string;
    @IsEmail()
    @IsNotEmpty({message:'Username không được để trống '})
    email:string;
    // @IsString()
    // role:string
}