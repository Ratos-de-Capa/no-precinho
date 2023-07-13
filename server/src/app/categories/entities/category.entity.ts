import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document & TimestampedDocument;

export class CategoryMenu {
  category: string;
  subCategories: string[];
}

export class CategoryProps {
  subCategory: string; // xiaomi
  category: string; // celular
}

// TODO: THINK ABOUT NAME OF THIS ENTITY

@Schema({ timestamps: true })
export class Category {
  constructor(props: CategoryProps) {
    Object.assign(this, props);
  }

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  subCategory: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category).index(
  { category: 1, subCategory: 1 },
  { unique: true },
);
