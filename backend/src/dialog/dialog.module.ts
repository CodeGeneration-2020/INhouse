import { Module } from '@nestjs/common';

import { MetricModule } from 'src/metric/metric.module';
import { ParserModule } from 'src/parser/parser.module';
import { TextAnalyzerModule } from 'src/text-analyzer/text-analyzer.module';

import { DialogController } from './dialog.controller';

import { DialogService } from './dialog.service';
import { AlgoliaDialogService } from './algolia-dialog.service';

@Module({
  imports: [MetricModule, ParserModule, TextAnalyzerModule],
  controllers: [DialogController],
  providers: [
    {
      provide: DialogService,
      useClass: AlgoliaDialogService,
    },
  ],
})
export class DialogModule {}
