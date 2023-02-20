import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';


@Module({
    imports:[
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                console.log(process.env.JWT_KEY);
                const options = {
                    secret: process.env.JWT_KEY,
                    // secretOrPrivateKey: process.env.JWT_KEY,
                    signOptions: {expiresIn: '60s'},
                }
                console.log(options);
                return options;
            },
            inject: [ConfigService],
        })
    ],
    providers: [AuthService, JwtStrategy, LocalStrategy],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
