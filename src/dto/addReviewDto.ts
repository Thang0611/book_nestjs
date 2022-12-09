import { IsNegative, IsNotEmpty, IsPositive, Max, Min } from "class-validator";
import { UserEntity } from '../user/user.entity';

export class AddReviewDto{
    @IsNotEmpty()
    @IsPositive()
    @Min(1)
    @Max(5)
    star:number;
    @IsNotEmpty()
    comment:string
    @IsNotEmpty()
    userId:number;
}