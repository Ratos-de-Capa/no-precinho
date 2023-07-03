import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document & TimestampedDocument;

export type ProductProps = {
  name: string;
  price: string;
  imageSource: string;
  link: string;
  origin: string;
};

@Schema({ timestamps: true })
export class Product {
  constructor(props: ProductProps) {
    Object.assign(this, props);
  }

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  imageSource: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  origin: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product).index({ link: 1 }, { unique: true});
