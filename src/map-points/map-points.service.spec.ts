import { Test, TestingModule } from '@nestjs/testing';
import { MapPointsService } from './map-points.service';

describe('MapPointsService', () => {
  let service: MapPointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapPointsService],
    }).compile();

    service = module.get<MapPointsService>(MapPointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
