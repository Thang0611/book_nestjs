import { Transform, Type } from "class-transformer";
import { IsDate, isDateString, IsDateString, IsInt, IsNotEmpty, IsPositive, IsString, Max, min, Min } from "class-validator";
import { ImageEntity } from "src/image/ImageEntity";

export class BookDto{
    // @IsNotEmpty({message:'bookId không được để trống'})
    // id:number;
    @IsNotEmpty({message:'Tiêu đề không được để trống'})
    title:string;
    @IsNotEmpty({message:'Tác giả không được để trống'})
    author:string;
    @IsNotEmpty({message:'Thể loại không được để trống'})
    category:string;
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty({message:'Ngày xuất bản không được để trống'})
    date:Date;
    // @IsInt({message:'Số trang phải là một số'})
    @IsPositive({message:'Số trang phải là số dương'})
    @IsNotEmpty({message:'Số trang không được để trống'})
    numOfPage:number;
    // @IsString()
    @IsNotEmpty({message:'Mô tả không được để trống'})
    decription:string;
    @IsNotEmpty({message:'Số lượng không được để trống'})
    // @IsInt({message:'Số trang phải là một số'})
    @IsPositive({message:'Số trang phải là số dương'})
    amount:number;
    // @IsNotEmpty()
    // urlImage:string;
    image?: ImageEntity
}


