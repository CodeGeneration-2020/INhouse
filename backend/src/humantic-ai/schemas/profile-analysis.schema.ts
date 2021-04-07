import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Type, Expose } from 'class-transformer';
import { Document, SchemaTypes } from 'mongoose';

import { Role } from 'src/shared/role.enum';

@Schema({
  versionKey: false,
})
export class ProfileAnalysis {
  @Type(() => String)
  @Expose({
    name: '_id',
    groups: [Role.ADMIN, Role.PRE, Role.SDRE],
  })
  id: string;

  @Type(() => String)
  @Prop({
    type: SchemaTypes.String,
    index: true,
    unique: true,
    required: true,
  })
  @Expose({
    groups: [Role.ADMIN, Role.PRE, Role.SDRE],
  })
  linkedInUrl: string;

  @Prop({
    type: SchemaTypes.Mixed,
  })
  @Expose({
    groups: [Role.ADMIN, Role.PRE, Role.SDRE],
  })
  analysis: any;
}

export type ProfileAnalysisDocument = ProfileAnalysis &
  Document<ProfileAnalysis>;

export const ProfileAnalysisSchema = SchemaFactory.createForClass(
  ProfileAnalysis,
);
