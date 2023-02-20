import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { jwtConstants } from "../constants";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        console.log('haha', process.env.JWT_KEY)
        console.log('kaka', jwtConstants.secret)
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            // secretOrKey: `${process.env.JWT_KEY}`,
            secretOrKey: "secretKey",
        });
    }

    async validate(payload: any) {
        console.log(payload)
        const { username} = payload;
        const user = await this.userService.findOne(username);
        user.password = undefined;
        return user;
    }
}