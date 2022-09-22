import { Module } from '@nestjs/common';
import { MapPointsService } from './map-points.service';
import { MapPointsController } from './map-points.controller';
import { MapPoint } from './entities/map-point.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MapPoint])],
  controllers: [MapPointsController],
  providers: [MapPointsService],
})
export class MapPointsModule {}
