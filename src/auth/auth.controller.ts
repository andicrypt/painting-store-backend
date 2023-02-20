import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './strategy/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() dto: LoginDto ) {
        const access_token = await this.authService.login(dto);
        return access_token;
    }
}
