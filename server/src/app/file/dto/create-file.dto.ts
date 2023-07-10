import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export interface FileProps {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

export class CreateFileDto {
  constructor(props: FileProps) {
    Object.assign(this, props);
  }

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  filename: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  originalname: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  size: number;

  @ApiProperty({ type: Buffer, required: true })
  @IsNotEmpty()
  buffer: Buffer;
}

export class CreateFilesDto {
  constructor(props: FileProps[]) {
    Object.assign(this, props);
  }

  @ApiProperty({ type: [CreateFileDto], required: true })
  @IsNotEmpty()
  @IsArray()
  files: CreateFileDto[];
}
