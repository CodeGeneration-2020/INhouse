import {
  Get,
  Query,
  UseGuards,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

import { Role } from 'src/shared/role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { SerializeInterceptor } from 'src/shared/interceptors/serialize.interceptor';

import { HumanticAiService } from './humantic-ai.service';

import { ProfileAnalysis } from './schemas/profile-analysis.schema';

import { GetAnalysisDto } from './dto/get-analysis.dto';
import { GetAnalysisRequestedByUserDto } from './dto/get-analysis-requested-by-user.dto';

@Controller('humantic-ai')
export class HumanticAiController {
  constructor(private humanticAiService: HumanticAiService) {}

  @Get('get-analysis')
  @UseGuards(JwtAuthGuard)
  getAnalysis(@Query() query: GetAnalysisDto) {
    return this.humanticAiService.getAnalysis(query);
  }

  @Get('get-count-analysis')
  @UseGuards(JwtAuthGuard)
  getAnalysisCount() {
    return this.humanticAiService.getCountAnalysis();
  }

  @Get('get-analysis-requested-by-user')
  @Roles([Role.ADMIN])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(new SerializeInterceptor(ProfileAnalysis))
  getAnalysisRequestedByUser(@Query() query: GetAnalysisRequestedByUserDto) {
    return this.humanticAiService.getAnalysisRequestedByUser(query);
  }
}
