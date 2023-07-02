import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  price: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  imageSource: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  link: string;
}
