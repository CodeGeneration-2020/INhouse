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
  getCountApiCalls(@Body() body: GetCountApiCallsDto) {
    return this.metricService.getCountApiCalls(body);
  }

  @Post('get-all-recognized')
  @UseGuards(JwtAuthGuard)
  getRecognized(@Body() body: GetAllRecognizedDto) {
    return this.metricService.getAllRecognized(body);
  }
}
