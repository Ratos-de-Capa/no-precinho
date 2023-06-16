import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './app/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `${__dirname}/../.env.${process.env.AMBIENTE}`,
        `${__dirname}/../.env`,
      ],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        readPreference: 'primaryPreferred',
      }),
      inject: [ConfigService],
    }),
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(private configService: ConfigService) {}
  onModuleInit() {
    this.logger.log(`Listen in port: ${this.configService.get('PORT')} `);
    this.logger.log(`Environment: ${this.configService.get('NODE_ENV')} `);
  }
}
