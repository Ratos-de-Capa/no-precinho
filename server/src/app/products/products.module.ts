import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { FileModule } from '../file/file.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), FileModule],
})
export class ProductsModule {}
