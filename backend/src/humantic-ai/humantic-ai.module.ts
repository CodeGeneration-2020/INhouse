import { MongooseModule } from '@nestjs/mongoose';
import { Module, HttpModule } from '@nestjs/common';

import { HumanticAiService } from './humantic-ai.service';
import { HumanticAiController } from './humantic-ai.controller';

import {
  ProfileAnalysis,
  ProfileAnalysisSchema,
} from './schemas/profile-analysis.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: ProfileAnalysis.name,
        schema: ProfileAnalysisSchema,
      },
    ]),
  ],
  controllers: [HumanticAiController],
  providers: [HumanticAiService],
  exports: [HumanticAiService],
})
export class HumanticAiModule {}
