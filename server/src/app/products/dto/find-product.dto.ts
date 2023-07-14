import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindProductDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  category: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  subCategory: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsArray()
  @IsOptional()
  brand: string[];

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  origin: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  minPrice: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  maxPrice: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  skip: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  limit: number;
}
