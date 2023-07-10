import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDtos } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';
import { CreateFileDto } from '../file/dto/create-file.dto';
import { FileService } from '../file/file.service';

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

  findAll() {
    this.logger.log(`Finding all products`);
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    this.logger.log(`Finding product by id ${id}`);
    return this.productModel.findOne({ id: id }).exec();
  }

  async search(search: string) {
    this.logger.log(`Searching product by search ${search}`);
    return this.productModel
      .find({ $text: { $search: search, $caseSensitive: false } })
      .sort({ score: { $meta: 'textScore' } })
      .exec();
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
}
