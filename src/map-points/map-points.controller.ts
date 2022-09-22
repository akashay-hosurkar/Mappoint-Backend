import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { MapPointsService } from './map-points.service';
import { CreateMapPointDto } from './dto/create-map-point.dto';
import { UpdateMapPointDto } from './dto/update-map-point.dto';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, readFileSync } from 'fs';
import { parse } from 'papaparse';

@Controller('map')
export class MapPointsController {
  geoDataModuleService: any;
  constructor(private readonly mapPointsService: MapPointsService) {}
  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './mapbox',
  //       filename: (req, file, callback) => {
  //         const fileExtName = extname(file.originalname);
  //         callback(null, `${file.originalname}${fileExtName}`);
  //       },
  //     }),
  //     fileFilter: (req, file, callback) => {
  //       if (!file.originalname.match(/\.(csv)$/)) {
  //         return callback(new Error('Only CSV files are allowed!'), false);
  //       }
  //       callback(null, true);
  //     },
  //   }),
  // )
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   const response = {
  //     message: 'File uploaded successfully!',
  //     data: {
  //       originalname: file.originalname,
  //       // filename: file.filename,
  //     },
  //   };
  //   return response;
  // }

  //
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './mapbox',
        filename: (req, file, callback) => {
          const fileExtName = extname(file.originalname);
          callback(null, `${file.originalname}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(csv)$/)) {
          return callback(new Error('Only CSV files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const csvFile = readFileSync(`mapbox/${file.originalname}`);
    const csvData = csvFile.toString();
    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });
    console.log(parsedCsv.data[0]);
    // var point = {
    //   type: 'Point',
    //   cordinates: [parsedCsv.data[0].id.lastIndexOf, parsedCsv.data[0].lon],
    // };
    parsedCsv.data.forEach((element) => {
      var point = {
        type: 'Point',
        coordinates: [element.lati, element.long],
      };

      const loadData = {
        id: element.id,
        long: element.long,
        name: element.name,
        lati: element.lati,
        city_name: element.city_name,
        location: point,
        // location:'0101000020E61000007A8D5DA27A1333403FAA61BF27385240',
      };
      console.log(loadData);
      this.mapPointsService.create(loadData);
      const response = {
        message: 'File uploaded successfully!',
        data: {
          originalname: file.originalname,
          // filename: file.filename,
        },
      };
      return response;
    });
  }
  @Get()
  findAll() {
    return this.mapPointsService.findAll();
  }
}
