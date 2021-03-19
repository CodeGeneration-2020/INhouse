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

import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';

@Controller('metric')
export class MetricController {
  constructor(private metricService: MetricService) {}

  @Post('get-count-api-calls')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getCountApiCalls(@Body() getCountApiCallsDto: GetCountApiCallsDto) {
    return this.metricService.getCountApiCall(getCountApiCallsDto);
  }
}
