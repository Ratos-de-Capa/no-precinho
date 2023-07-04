export interface Product {
    name: string;
    price: number;
    imageSource: string;
    link: string;
    origin: "amazon" | "mercado_livre";
    basicDescription?: string;
    datasheet?: Info[];
}

export interface Info {
    [key: string]: string 
}