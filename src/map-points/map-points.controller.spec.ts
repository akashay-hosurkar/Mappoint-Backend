import { Test, TestingModule } from '@nestjs/testing';
import { MapPointsController } from './map-points.controller';
import { MapPointsService } from './map-points.service';

describe('MapPointsController', () => {
  let controller: MapPointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MapPointsController],
      providers: [MapPointsService],
    }).compile();

    controller = module.get<MapPointsController>(MapPointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
