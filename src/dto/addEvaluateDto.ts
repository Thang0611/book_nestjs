import { IsNegative, IsNotEmpty, IsPositive } from "class-validator";
import { UserEntity } from '../user/user.entity';

export class AddEvaluateDto{

 
    @IsNotEmpty()
    @IsPositive()
    star:number;
    @IsNotEmpty()
    comment:string
    @IsNotEmpty()
    userId:number;
}