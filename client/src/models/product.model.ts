import { Category } from "./category.model";
import { Image } from "./image.model";
import { Info } from "./info.model";
import { Reviews } from "./reviews.model";

export class Product {
  id: string;
  name: string;
  price: string;
  cover: Image;
  images?: Image[];
  category: Category;
  link: string;
  origin: string;
  reviews?: Reviews;
  percentOff?: number;
  description?: string;
  datasheet?: Info[];
  paymentDetails?: string;
}
