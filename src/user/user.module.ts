import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {MongooseModule} from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/users.schema';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard],
  exports: [UserService],
})
export class UserModule {}
