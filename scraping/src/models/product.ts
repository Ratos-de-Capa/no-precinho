import { Category } from "./category";

export interface Product{
    name: string;
    price: number;
    cover: Image;
    link: string;
    origin: "amazon" | "mercado_livre";
    category: Category
    reviews?: Reviews; // TODO
    percentOff?: number; 
    paymentDetails?: string;
    description?: string; // TODO
    datasheet?: Info[]; 
    images?: Image[]; // TODO
}

export interface Info {
    key: string;
    value: string; 
}

export interface Reviews {
    rating: number;
    evaluations: number;
}

export interface Image {
    src: string;
    key?: string;
    alt?: string;
  }
  
