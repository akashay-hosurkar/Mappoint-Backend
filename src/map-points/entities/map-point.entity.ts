import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson';
@Entity('map')
export class MapPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  long: string;
  @Column()
  name: string;
  @Column()
  lati: string;
  @Column()
  city_name: string;
  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;
}
