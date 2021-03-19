import { MongooseModule } from '@nestjs/mongoose';
import { Module, HttpModule } from '@nestjs/common';

import { HumanticAiService } from './humantic-ai.service';
import { HumanticAiController } from './humantic-ai.controller';

import { MetricModule } from '../metric/metric.module';

import {
  ProfileAnalysis,
  ProfileAnalysisSchema,
} from './schemas/profile-analysis.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProfileAnalysis.name,
        schema: ProfileAnalysisSchema,
      },
    ]),
    HttpModule,
    MetricModule,
  ],
  controllers: [HumanticAiController],
  providers: [HumanticAiService],
  exports: [HumanticAiService],
})
export class HumanticAiModule {}
