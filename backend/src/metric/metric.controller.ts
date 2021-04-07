import {
  Body,
  Post,
  UseGuards,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

import { Role } from 'src/shared/role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { SerializeInterceptor } from 'src/shared/interceptors/serialize.interceptor';

import { MetricService } from './metric.service';
import { RecognizeMetric } from './schemas/recognize-metric.schema';

import { GetCountApiCallsDto } from './dto/get-count-api-calls.dto';
import { GetAllRecognizedDto } from './dto/get-all-recognized.dto';

@Controller('metric')
export class MetricController {
  constructor(private metricService: MetricService) {}

  @Post('get-count-api-calls')
  @Roles([Role.ADMIN])
  @UseGuards(JwtAuthGuard, RoleGuard)
  getCountApiCalls(@Body() body: GetCountApiCallsDto) {
    return this.metricService.getCountApiCalls(body);
  }

  @Post('get-all-recognized')
  @Roles([Role.ADMIN])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(new SerializeInterceptor(RecognizeMetric))
  getRecognized(@Body() body: GetAllRecognizedDto) {
    return this.metricService.getAllRecognized(body);
  }
}
