import { MongooseModule } from '@nestjs/mongoose';
import { Module, HttpModule } from '@nestjs/common';

import { MetricModule } from 'src/metric/metric.module';

import { HumanticAiService } from './humantic-ai.service';
import { HumanticAiController } from './humantic-ai.controller';

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
})
export class HumanticAiModule {}
