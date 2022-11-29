import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super()
    }
    async validate(username:string,password:string){
        const user=await this.authService.validateUser(username,password)
        if (!user){
            console.log(3)
            throw new UnauthorizedException({success:false,smg:'dang nhap that bai'});
        }
        console.log(0)
        return user
        
    }
}