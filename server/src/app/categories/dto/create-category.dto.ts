import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
export class CreateCategoryDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  subCategory: string;
}

export class CreateManyCategoryDto {
  @ApiProperty({ type: [CreateCategoryDto], required: true })
  @IsNotEmpty()
  @IsArray()
  categories: CreateCategoryDto[];
}
