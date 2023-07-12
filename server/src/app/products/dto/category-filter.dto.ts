import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryFilterDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  skip: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  limit: number;
}
