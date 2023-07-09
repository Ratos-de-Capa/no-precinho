import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
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
  @IsString()
  coverImageSrc: string;

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
  reviews?: Review;

  @ApiProperty({ type: Number, required: false })
  @IsNotEmpty()
  @IsNumber()
  percentOff?: number;

  @ApiProperty({ type: String, required: false })
  @IsNotEmpty()
  @IsString()
  description?: string;

  @ApiProperty({ type: String, required: false })
  @IsNotEmpty()
  @IsString()
  paymentDetails?: string;

  @ApiProperty({ type: [Info], required: false })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  datasheet?: Info[];
}

export class CreateProductDtos {
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  data: CreateProductDto[];
}
