import { Controller,Post,Body } from '@nestjs/common';
import { registerDto } from 'src/dto/registerDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private UserService:UserService){}
      @Post('/register')
    async register(@Body() registerDto: registerDto) {
    const user = await this.UserService.addUser(registerDto);
    console.log(user)
    return user;
  }
}
