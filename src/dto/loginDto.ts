import { IsNotEmpty } from "class-validator";

export class loginDto{

    @IsNotEmpty({message:'Username không được để trống'})
    username:string;

    @IsNotEmpty({message:'Password không được để trống'})
    password:string
    
}