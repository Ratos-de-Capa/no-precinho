import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';
import { CreateFileDto, CreateFilesDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);

  constructor(private configService: ConfigService) {}

  // async updateCover(dataBuffer: Buffer, createFileDto: CreateFileDto) {
  //   try {
  //     const createdFile = new this.fileModel(createFileDto);

  //     const uploadResponse = this.uploadFile(dataBuffer, createdFile.filename);

  //     if (uploadResponse) this.logger.log(`Adding a new file: ${createdFile.filename} into Property: ${property}`);

  //     const response = await this.propertyModel.findOneAndUpdate(
  //       { _id: property },
  //       {
  //         cover: createdFile,
  //       },
  //     );

  //     console.log('response', response);
  //   } catch (err) {
  //     this.logger.warn(`erro on update cover requested for proprety: ${property}`, err);
  //   }
  // }

  async uploadFile(
    createFileDto: CreateFileDto,
  ): Promise<{ url: string; key: string }> {
    const { configService } = this;

    const s3 = new S3();
    const result = await s3
      .upload({
        Bucket: configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: createFileDto.buffer,
        Key: `${randomUUID()}-${createFileDto.originalname}`,
      })
      .promise();

    return {
      url: result.Location,
      key: result.Key,
    };
  }

  async removeFile(key: string) {
    const { configService } = this;

    const s3 = new S3();
    const result = await s3
      .deleteObject({
        Bucket: configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: key,
      })
      .promise();

    return result;
  }

  async uploadFiles(
    createFilesDto: CreateFilesDto,
  ): Promise<{ url: string; key: string; name: string }[]> {
    const { configService } = this;

    const s3 = new S3();

    const uploadPromises = createFilesDto.files.map(async (file) => {
      const result = await s3
        .upload({
          Bucket: configService.get('AWS_PUBLIC_BUCKET_NAME'),
          Body: file.buffer,
          Key: `${randomUUID()}-${file.originalname}`,
        })
        .promise();

      return {
        url: result.Location,
        key: result.Key,
        name: file.originalname,
      };
    });

    return Promise.all(uploadPromises);
  }

  async updateFile(
    updateFileDto: UpdateFileDto,
  ): Promise<{ url: string; key: string }> {
    const { configService } = this;

    const s3 = new S3();

    const result = await s3
      .upload({
        Bucket: configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: updateFileDto.buffer,
        Key: updateFileDto.key,
      })
      .promise();

    return {
      url: result.Location,
      key: result.Key,
    };
  }
}
