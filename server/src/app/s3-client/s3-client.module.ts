import { Module } from '@nestjs/common';
import { S3ClientService } from './s3-client.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [S3ClientService],
  imports: [ConfigModule],
  exports: [S3ClientService],
})
export class S3ClientModule {}
