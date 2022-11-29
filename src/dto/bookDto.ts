import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { ImageEntity } from "src/image/ImageEntity";

export class BookDto{
    bookId:number;
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
    // urlImage:string;
    image?: ImageEntity
}


