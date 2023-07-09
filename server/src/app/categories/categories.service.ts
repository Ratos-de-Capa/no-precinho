import { Injectable, Logger } from '@nestjs/common';
import {
  CreateCategoryDto,
  CreateManyCategoryDto,
} from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    this.logger.log(`Creating category ${createCategoryDto.subCategory}`);
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll() {
    this.logger.log(`Finding all categories`);
    const categoryEntities = await this.categoryModel.find().exec();

    return categoryEntities.map((category) =>
      this.categoryEntityToDto(category),
    );
  }

  findOne(subCategory: string) {
    this.logger.log(`Finding category by subCategory ${subCategory}`);
    return this.categoryModel.findOne({ subCategory }).exec();
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    this.logger.log(`Updating category by id ${id}`);
    return this.categoryModel.updateOne({ _id: id }, updateCategoryDto).exec();
  }

  remove(id: string) {
    this.logger.log(`Removing category by id ${id}`);
    return this.categoryModel.deleteOne({ _id: id }).exec();
  }

  createMany(createCategoryDto: CreateManyCategoryDto) {
    this.logger.log(`Creating many categories`);
    return this.categoryModel.insertMany(createCategoryDto.categories);
  }

  categoryEntityToDto(category: Category): CreateCategoryDto {
    return {
      category: category.category,
      subCategory: category.subCategory,
    };
  }
}
