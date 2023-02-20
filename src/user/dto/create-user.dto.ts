import { ApiProperty } from "@nestjs/swagger";
import {IsString, IsNotEmpty} from "class-validator";
import { UserRole } from "src/schemas/users.schema";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    role: UserRole;
}
