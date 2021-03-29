import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { File, FileDocument } from './schemas/file.schema';

import { UploadOptions, DownloadOptions } from './file.types';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name)
    private fileModel: Model<FileDocument>,
  ) {}

  async findById(id: any) {
    return this.fileModel.findOne({ _id: id });
  }

  async upload({ filename, contentType, stream }: UploadOptions) {
    const file = new this.fileModel({ filename, contentType });

    return file.upload(stream);
  }

  async download({ id }: DownloadOptions) {
    const file = await this.findById(id);

    const stream = file.getDownloadStream();

    return { file, stream };
  }
}
