import { Module } from '@nestjs/common';

import { DialogController } from './dialog.controller';

import { DialogService } from './dialog.service';
import { AlgoliaDialogService } from './algolia-dialog.service';

@Module({
  controllers: [DialogController],
  providers: [
    {
      provide: DialogService,
      useClass: AlgoliaDialogService,
    },
  ],
})
export class DialogModule {}
