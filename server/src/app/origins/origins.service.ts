import { Injectable, Logger } from '@nestjs/common';
import { CreateOriginDto } from './dto/create-origin.dto';
import { UpdateOriginDto } from './dto/update-origin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Origin, OriginDocument } from './entities/origin.entity';

@Injectable()
export class OriginsService {
  private readonly logger = new Logger(OriginsService.name);

  constructor(
    @InjectModel(Origin.name) private originModel: Model<OriginDocument>
  ) {}

  create(createOriginDto: CreateOriginDto) {
    return 'This action adds a new origin';
  }

  findAll() {
    return `This action returns all origins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} origin`;
  }

  update(id: number, updateOriginDto: UpdateOriginDto) {
    return `This action updates a #${id} origin`;
  }

  remove(id: number) {
    return `This action removes a #${id} origin`;
  }
}
