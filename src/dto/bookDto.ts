import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class BookDto{
    bookid:string;
    @IsString()
    @IsNotEmpty()
    title:string;
    @IsString()
    @IsNotEmpty()
    author:string;
    @IsString()
    @IsNotEmpty()
    category:string;
    @IsString()
    @IsNotEmpty()
    date:Date;
    // @IsNumber()
    @IsNotEmpty()
    numOfPage:number;
    @IsString()
    @IsNotEmpty({})
    detail:string;
    @IsNotEmpty()
    amount:number;
    // @IsNotEmpty()
    urlImage:string;
}


