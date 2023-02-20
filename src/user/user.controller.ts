import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  HttpCode,
  UseGuards,
  Response,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { LocalAuthGuard } from 'src/auth/strategy/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { RolesGuard } from './roles/roles.guard';
import { Roles } from './roles/roles.decorator';
import { UserRole } from 'src/schemas/users.schema';

@ApiCookieAuth()
@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Post('register')
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('profile')
  async getProfile() { 
    return await this.userService.findAllUser();
  }
  

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }
  //

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
