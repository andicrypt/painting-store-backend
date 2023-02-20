import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Art, ArtDocument } from 'src/schemas/arts.schema';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';

@Injectable()
export class ArtService {
  constructor(@InjectModel(Art.name) private artModel: Model<ArtDocument>){}

  async create(createArtDto: CreateArtDto) {
    const createArt = new this.artModel(createArtDto);
    return await createArt.save();
  }

  async findAll(): Promise<Art[] | undefined> {
    return await this.artModel.find({}).exec();
  }

  async findOne(id: string) {
    return await this.artModel.findById(id).exec();
  }

  async update(id: string, updateArtDto: UpdateArtDto) {
    return await this.artModel.findByIdAndUpdate(id, updateArtDto);
  }

  async remove(id: string) {
    return await this.artModel.findByIdAndRemove(id).exec();
  }
}
