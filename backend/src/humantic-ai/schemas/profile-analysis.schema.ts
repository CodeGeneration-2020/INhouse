import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, SchemaTypes } from 'mongoose';

@Schema({
  versionKey: false,
})
export class ProfileAnalysis {
  @Prop({
    type: SchemaTypes.String,
    index: true,
    unique: true,
    required: true,
  })
  linkedInUrl: string;

  @Prop({
    type: SchemaTypes.Mixed,
  })
  analysis: any;
}

export type ProfileAnalysisDocument = ProfileAnalysis & Document;

export const ProfileAnalysisSchema = SchemaFactory.createForClass(
  ProfileAnalysis,
);
