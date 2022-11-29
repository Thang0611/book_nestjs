import { Controller, Request, Get, Post, Body, UseGuards } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

import { Roles } from './decorators/roles.decorator';
import { Role } from './emuns/role.enum';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

import { RolesGuard } from './guards/roles.guard';
import { registerDto } from '../dto/registerDto';
import { AuthGuard } from '@nestjs/passport';
import { loginDto } from 'src/dto/loginDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

//   @Post('/register')
//   async register(@Body() registerDto: registerDto) {
//     const user = await this.userService.addUser(registerDto);
//     console.log(user)
//     return user;
//   }


  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req,@Body() loginDto: loginDto) {
    console.log('end')
    return this.authService.login(req.user);
  }



  @UseGuards(JwtAuthGuard)
  @Get('/home')
  home(){
    return 'this is home page'
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @UseGuards(AuthGuard('jwt'))
  @Roles(Role.User)
  @Get('/user')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/admin')
  getDashboard(@Request() req) {
    return req.user;
  }
}