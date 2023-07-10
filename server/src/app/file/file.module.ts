import { Module } from '@nestjs/common';
import { FileService } from './file.service';

@Module({
  controllers: [],
  providers: [FileService],
  imports: [],
})
export class FileModule {}
