import { Module } from '@nestjs/common';

import { MetricModule } from 'src/metric/metric.module';

import { DialogController } from './dialog.controller';

import { DialogService } from './dialog.service';
import { AlgoliaDialogService } from './algolia-dialog.service';

@Module({
  imports: [MetricModule],
  controllers: [DialogController],
  providers: [
    {
      provide: DialogService,
      useClass: AlgoliaDialogService,
    },
  ],
})
export class DialogModule {}
