import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateFileDto } from './create-file.dto';

export class UpdateFileDto extends PartialType(CreateFileDto) {
  constructor(props: Partial<CreateFileDto>) {
    super();
    Object.assign(this, props);
  }

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  key: string;
}
