import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileService } from './file.service';
import { FileController } from './file.controller';

import { File, FileSchema } from './schemas/file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: File.name,
        schema: FileSchema,
        collection: 'fs.files',
      },
    ]),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
