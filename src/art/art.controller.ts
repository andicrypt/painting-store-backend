import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { UserRole } from 'src/schemas/users.schema';
import { Roles } from 'src/user/roles/roles.decorator';
import { RolesGuard } from 'src/user/roles/roles.guard';
import { ArtService } from './art.service';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';

@ApiCookieAuth()
@ApiTags('art')
@Controller('art')
export class ArtController {
  constructor(private readonly artService: ArtService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('create')
  create(@Body() createArtDto: CreateArtDto) {
    console.log(createArtDto);
    return this.artService.create(createArtDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('getAll')
  findAllArt() {
    return this.artService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.artService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateArtDto: UpdateArtDto) {
    return this.artService.update(id, updateArtDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.artService.remove(id);
  }
}
