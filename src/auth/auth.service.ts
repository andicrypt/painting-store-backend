import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

const salt = parseInt(process.env.SALTORROUNDS);

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        console.log('hello', user)
        console.log(username, password)
        const isValid: boolean = await bcrypt.compare(password, user.password);
        // console.log(user.password, " ", hashPassword);
        if(user && isValid) {
            const {password, ...result} =user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {username: user.username};
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
