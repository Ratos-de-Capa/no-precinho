export interface BasicProduct {
    name: string;
    price: number;
    imageSource: string;
    link: string;
    origin: "amazon" | "mercado_livre";
}