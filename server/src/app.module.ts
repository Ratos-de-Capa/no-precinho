import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './app/auth/auth.module';
import { jwtConstants } from './app/auth/constants/jwt.constant';
import { AuthGuard } from './app/auth/guards/auth.guard';
import { CategoriesModule } from './app/categories/categories.module';
import { ProductsModule } from './app/products/products.module';
import { UsersModule } from './app/users/users.module';
import { S3ClientModule } from './app/s3-client/s3-client.module';

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
    ProductsModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    S3ClientModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(private configService: ConfigService) {}
  onModuleInit() {
    this.logger.log(`Listen in port: ${this.configService.get('PORT')} `);
    this.logger.log(`Environment: ${this.configService.get('AMBIENTE')} `);
  }
}
