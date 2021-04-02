import { Module, HttpModule } from '@nestjs/common';

import { TextAnalyzerService } from './text-analyzer.service';
import { AITextAnalyzerService } from './ai-text-analyzer.service';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: TextAnalyzerService,
      useClass: AITextAnalyzerService,
    },
  ],
  exports: [TextAnalyzerService],
})
export class TextAnalyzerModule {}
