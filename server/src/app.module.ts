import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './app/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './app/auth/guards/auth.guard';

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
    UsersModule,],
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
    this.logger.log(`Environment: ${this.configService.get('NODE_ENV')} `);
  }
}
