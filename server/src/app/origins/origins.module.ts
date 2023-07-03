import { Module } from '@nestjs/common';
import { OriginsService } from './origins.service';
import { OriginsController } from './origins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Origin, OriginSchema } from './entities/origin.entity';

@Module({
  controllers: [OriginsController],
  providers: [OriginsService],
  imports: [
    MongooseModule.forFeature([{ name: Origin.name, schema: OriginSchema}])
  ],
})
export class OriginsModule {}
