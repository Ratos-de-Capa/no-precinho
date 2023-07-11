import { Category } from "./category";

export interface Product{
    name: string;
    price: number;
    coverImageSrc: string;
    link: string;
    origin: "amazon" | "mercado_livre";
    category: Category
    reviews?: Reviews; // TODO
    percentOff?: number; 
    paymentDetails?: string;
    description?: string; // TODO
    datasheet?: Info[]; 
    imagesSrc?: string[]; // TODO
}

export interface Info {
    key: string;
    value: string; 
}

export interface Reviews {
    rating: number;
    evaluations: number;
}
