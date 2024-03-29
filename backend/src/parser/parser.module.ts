import { Module } from '@nestjs/common';

import { ParserController } from './parser.conroller';

import { ParserService } from './parser.service';

@Module({
  controllers: [ParserController],
  providers: [ParserService],
  exports: [ParserService],
})
export class ParserModule {}
