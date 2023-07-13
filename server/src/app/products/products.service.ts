import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDtos } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';
import { CreateFileDto } from '../file/dto/create-file.dto';
import { FileService } from '../file/file.service';
import { CategoryFilterDto } from './dto/category-filter.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly fileService: FileService,
  ) {}

  create(updateProducts: CreateProductDtos) {
    this.logger.log(`adding products in db`);
    const bulkOps = updateProducts.data.map((updateProduct) => ({
      updateOne: {
        filter: { link: updateProduct.link },
        update: updateProduct,
        upsert: true,
      },
    }));
    return this.productModel.bulkWrite(bulkOps);
  }

  async findAll() {
    this.logger.log(`Finding all products`);
    const result = await this.productModel.find().exec();

    return result.map((product) => this.parseProduct(product));
  }

  async findOne(id: string) {
    this.logger.log(`Finding product by id ${id}`);
    const result = await this.productModel.findOne({ _id: id }).exec();

    return this.parseProduct(result);
  }

  async search(search: string) {
    this.logger.log(`Searching product by search ${search}`);
    const result = await this.productModel
      .find({ $text: { $search: search, $caseSensitive: false } })
      .sort({ score: { $meta: 'textScore' } })
      .exec();

    return result.map((product) => this.parseProduct(product));
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    this.logger.log(`Updating product by id ${id}`);
    return this.productModel.updateOne({ _id: id }, updateProductDto).exec();
  }

  remove(id: string) {
    this.logger.log(`Removing product by id ${id}`);
    return this.productModel.deleteOne({ _id: id }).exec();
  }

  async updateCover(id: string, createFileDto: CreateFileDto) {
    this.logger.log(`Updating product cover by id ${id}`);

    //update on s3
    const response = await this.fileService.uploadFile(createFileDto);

    //update flag cover on db
    return this.productModel.updateOne({ _id: id }, { cover: response.url });
  }

  async getProductsByCategory(categoryDto: CategoryFilterDto) {
    this.logger.log(`listing products by category ${categoryDto.category}`);
    const { category, limit, skip } = categoryDto;
    const result = await this.productModel.find({ 'category.category': category }, null, { skip, limit }).exec();

    return result.map((product) => this.parseProduct(product));
  }

  async getWeekHighlights(skip: number, limit: number) {
    this.logger.log(`listing week highlights`);
    const result = await this.productModel.find().sort({ 'reviews.rating': -1 }).skip(skip).limit(limit).exec();

    return result.map((product) => this.parseProduct(product));
  }

  async getPopularProducts(skip: number, limit: number) {
    this.logger.log(`listing popular products`);
    const result = await this.productModel.find().sort({ 'reviews.evaluations': -1 }).skip(skip).limit(limit).exec();

    return result.map((product) => this.parseProduct(product));
  }

  parseProduct(product: ProductDocument) {
    const {
      _id,
      name,
      price,
      cover,
      images,
      category,
      link,
      origin,
      reviews,
      percentOff,
      description,
      datasheet,
      paymentDetails,
    } = product;
    return {
      id: _id,
      name,
      price,
      cover,
      images,
      category,
      link,
      origin,
      reviews,
      percentOff,
      description,
      datasheet,
      paymentDetails,
    };
  }
}
