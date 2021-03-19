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

@Controller('humantic-ai')
export class HumanticAiController {
  constructor(private humanticAiService: HumanticAiService) {}

  @Post('get-analysis')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getAnalysis(@Body() getAnalysisDto: GetAnalysisDto) {
    return this.humanticAiService.getAnalysis(getAnalysisDto);
  }

  @Post('get-analysis-count')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getAnalysisCount() {
    return this.humanticAiService.getAnalysisCount();
  }
}
