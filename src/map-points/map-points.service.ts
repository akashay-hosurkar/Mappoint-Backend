import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMapPointDto } from './dto/create-map-point.dto';
import { UpdateMapPointDto } from './dto/update-map-point.dto';
import { MapPoint } from './entities/map-point.entity';

@Injectable()
export class MapPointsService {
  // create(createMapPointDto: CreateMapPointDto) {
  //   return 'This action adds a new mapPoint';
  // }
  constructor(
    @InjectRepository(MapPoint)
    private readonly MapPointRepository: Repository<MapPoint>,
  ) {}
  create(createMapPointDto: CreateMapPointDto) {
    return this.MapPointRepository.save(createMapPointDto);
  }
  findAll() {
    return this.MapPointRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} mapPoint`;
  // }

  // update(id: number, updateMapPointDto: UpdateMapPointDto) {
  //   return `This action updates a #${id} mapPoint`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} mapPoint`;
  // }
}
