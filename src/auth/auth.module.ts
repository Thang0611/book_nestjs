import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from '../user/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
// import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { jwtConstants } from './constains';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginValidateMiddleware } from 'src/middleware/loginValidate.middleware';

@Module({
  imports:[UserEntity,
    PassportModule,
    UserModule,
    JwtModule.register({
      secret:jwtConstants.secret,
      // secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  exports:[]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginValidateMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
  }
}
