import { ConsoleLogger, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProductToSearch } from './entities/product.entity';
import { mockProductsToSearch } from './mock-products';

export interface IProducts {
    name: string;
    price: string;
    imageSource: string;
    link: string;
} 

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll(): IProductToSearch[] {
    return mockProductsToSearch;
  }

  findOne(item: string) {
      return `This action returns a #${item} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
