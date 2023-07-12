import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategoryProps } from '../../categories/entities/category.entity';

export type ProductDocument = Product & Document & TimestampedDocument;

export type ProductProps = {
  name: string;
  price: string;
  coverImageSrc: string;
  imagesSrc?: string[];
  category: CategoryProps;
  link: string;
  origin: string;
  reviews?: Reviews;
  percentOff?: number;
  description?: string;
  datasheet?: Info[];
  paymentDetails?: string;
};

export class Info {
  key: string;
  value: string;
}

export class Reviews {
  rating: number;
  evaluations: number;
}

export class Image {
  src: string;
  key?: string;
  alt?: string;
}

@Schema({ timestamps: true })
export class Product {
  constructor(props: ProductProps) {
    Object.assign(this, props);
  }

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  cover: Image;

  @Prop()
  images: Image[];

  @Prop()
  reviews: Reviews;

  @Prop()
  percentOff: number;

  @Prop()
  description: string;

  @Prop()
  datasheet: Info[];

  @Prop()
  paymentDetails: string;

  @Prop()
  category: CategoryProps;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ link: 1 }, { unique: true });
ProductSchema.index({ name: 'text' });
