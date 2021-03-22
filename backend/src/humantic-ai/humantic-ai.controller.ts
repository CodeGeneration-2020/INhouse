import {
  Body,
  Post,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

import { HumanticAiService } from './humantic-ai.service';

import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';

import { GetAnalysisDto } from './dto/get-analysis.dto';
import { GetAnalysisRequestedByUserDto } from './dto/get-analysis-requested-by-user.dto';

@Controller('humantic-ai')
export class HumanticAiController {
  constructor(private humanticAiService: HumanticAiService) {}

  @Post('get-analysis')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getAnalysis(@Body() getAnalysisDto: GetAnalysisDto) {
    return this.humanticAiService.getAnalysis(getAnalysisDto);
  }

  @Post('get-count-analysis')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getAnalysisCount() {
    return this.humanticAiService.getCountAnalysis();
  }

  @Post('get-analysis-requested-by-user')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getAnalysisRequestedByUser(@Body() params: GetAnalysisRequestedByUserDto) {
    return this.humanticAiService.getAnalysisRequestedByUser(params);
  }
}
