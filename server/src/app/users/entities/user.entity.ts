import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document & TimestampedDocument;

export type UserProps = {
  login: string;
  name: string;
  email: string;
  password: string;
};

@Schema({ timestamps: true })
export class User {
  constructor(props: UserProps) {
    Object.assign(this, props);
  }

  @Prop({ unique: true, required: true })
  login: string;

  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User).index(
  { id: 1, login: 1, email: 1 },
  { unique: true },
);
