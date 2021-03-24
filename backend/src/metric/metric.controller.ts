import {
  Body,
  Post,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

import { MetricService } from './metric.service';

import { GetCountApiCallsDto } from './dto/get-count-api-calls.dto';
import { GetAllRecognizedDto } from './dto/get-all-recognized.dto';

import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';

@Controller('metric')
export class MetricController {
  constructor(private metricService: MetricService) {}

  @Post('get-count-api-calls')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getCountApiCalls(@Body() params: GetCountApiCallsDto) {
    return this.metricService.getCountApiCalls(params);
  }

  @Post('get-all-recognized')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getRecognized(@Body() params: GetAllRecognizedDto) {
    return this.metricService.getAllRecognized(params);
  }
}
