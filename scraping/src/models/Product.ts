
export interface Product {
    name: string;
    price: string;
    imageSource: string;
    link: string;
    origin: "amazon" | "mercado_livre";
}

export enum SiteOriginEnum {
    mercadoLivre = "mercado_livre",
    amazon = "amazon",
}