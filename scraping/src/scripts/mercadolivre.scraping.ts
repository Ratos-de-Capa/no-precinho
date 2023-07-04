import { Product } from "../models/product";
import { Scraping } from "../models/scraping";
import { Category } from "../models/category";

export class MercadoLivreScraping extends Scraping {

    constructor(searchList: Category[]) {
        super(searchList);
    }

    async search(search: Category): Promise<Product[]> {
        return [{ name: "", price: 0, imageSource: "", link: "", origin: "mercado_livre"}]
    }
    
}