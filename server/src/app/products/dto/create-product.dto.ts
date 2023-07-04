import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, NotEquals, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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
  imageSource: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  link: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  origin: string;
}

export class CreateProductDtos {
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  data: CreateProductDto[];
}