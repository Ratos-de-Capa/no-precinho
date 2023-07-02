import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    this.logger.log(`Creating property name ${createUserDto.name}`);
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    this.logger.log(`Finding all users`);
    return this.userModel.find().exec();
  }

  async findOne(login: string) {
    this.logger.log(`Finding user by login ${login}`);
    return this.userModel.findOne({ login }).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    this.logger.log(`Updating user by id ${id}`);
    return this.userModel.updateOne({ _id: id }, updateUserDto).exec();
  }

  remove(id: string) {
    this.logger.log(`Removing user by id ${id}`);
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
