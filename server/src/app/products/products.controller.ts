import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDtos } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from '../auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from '../file/dto/create-file.dto';
import { CategoryFilterDto } from './dto/category-filter.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Post()
  create(@Body() updateProducts: CreateProductDtos) {
    console.log('createProductDto: ', updateProducts);
    return this.productsService.create(updateProducts);
  }

  @Public()
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Public()
  @Get(':item')
  findOne(@Param('item') item: string) {
    return this.productsService.findOne(item);
  }

  @Public()
  @Post('/category')
  getProductsByCategory(@Body() categoryFilterDto: CategoryFilterDto) {
    return this.productsService.getProductsByCategory(categoryFilterDto);
  }

  @Public()
  @Get('/search/:search')
  search(@Param('search') search: string) {
    return this.productsService.search(search);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Public()
  @Post('/update-cover/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadCover(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const { buffer, fieldname, originalname, size, mimetype } = file;

    const fileDto = new CreateFileDto({
      filename: fieldname,
      originalname,
      mimetype,
      size,
      buffer,
    });

    console.log(fileDto);

    return this.productsService.updateCover(id, fileDto);
  }
}
