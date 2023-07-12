import { Injectable, Logger } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3ClientService {
  private readonly logger = new Logger(S3ClientService.name);

  _s3Client: S3Client;

  constructor(private configService: ConfigService) {
    const endpoint = configService.get('ENDPOINT');

    this.logger.log(`S3 client connected to endpoint: ${endpoint}`);

    this._s3Client = new S3Client({
      endpoint,
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  get s3Client() {
    return this._s3Client;
  }
}
