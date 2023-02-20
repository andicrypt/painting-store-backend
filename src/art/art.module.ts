import { Module } from '@nestjs/common';
import { ArtService } from './art.service';
import { ArtController } from './art.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Art, ArtSchema } from 'src/schemas/arts.schema';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: Art.name, schema: ArtSchema }])],
  controllers: [ArtController],
  providers: [ArtService, JwtAuthGuard],
})
export class ArtModule {}
