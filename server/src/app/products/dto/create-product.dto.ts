import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Info } from '../entities/product.entity';
import { Type } from 'class-transformer';

class Review {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsNumber()
  evaluations: number;
}

class Category {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  subCategory: string;
}

class Image {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  src: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  key: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  alt: string;
}

export class CreateProductDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  price: number;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  cover: Image;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  link: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  origin: string;

  @ApiProperty({ type: Category, required: true })
  @IsNotEmpty()
  category: Category;

  @ApiProperty({ type: Review, required: false })
  @IsNotEmpty()
  @IsOptional()
  reviews?: Review;

  @ApiProperty({ type: Number, required: false })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  percentOff?: number;

  @ApiProperty({ type: String, required: false })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: String, required: false })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  paymentDetails?: string;

  @ApiProperty({ type: [Info], required: false })
  @IsNotEmpty()
  @IsArray()
  @IsOptional()
  datasheet?: Info[];

  @ApiProperty({ type: [String], required: false })
  @IsNotEmpty()
  @IsArray()
  @IsOptional()
  images?: Image[];
}

export class CreateProductDtos {
  @ApiProperty({ type: [CreateProductDto], required: true })
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  data: CreateProductDto[];
}
