import { Module, HttpModule } from '@nestjs/common';

import { DialogController } from './dialog.controller';

import { DialogService } from './dialog/dialog.service';
import { AlgoliaDialogService } from './dialog/algolia-dialog.service';

import { TextAnalyzerService } from './text-analyzer/text-analyzer.service';
import { AITextAnalyzerService } from './text-analyzer/ai-text-analyzer.service';

@Module({
  imports: [HttpModule],
  controllers: [DialogController],
  providers: [
    {
      provide: DialogService,
      useClass: AlgoliaDialogService,
    },
    {
      provide: TextAnalyzerService,
      useClass: AITextAnalyzerService,
    },
  ],
})
export class DialogModule {}
