import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

export interface IProducts {
    name: string;
    price: string;
    imageSource: string;
    link: string;
} 

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  create(createProductDto: CreateProductDto) {
    this.logger.log(`Creating product name ${createProductDto.name}`);
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  findAll() {
    this.logger.log(`Finding all products`);
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    this.logger.log(`Finding product by id ${id}`);
    return this.productModel.findOne({ id: id }).exec();
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    this.logger.log(`Updating product by id ${id}`);
    return this.productModel.updateOne({ _id: id }, updateProductDto).exec();
  }

  remove(id: string) {
    this.logger.log(`Removing product by id ${id}`);
    return this.productModel.deleteOne({ _id: id }).exec();
  }
}
