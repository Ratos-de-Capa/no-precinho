import { Product, SiteOriginEnum } from "../models/Product";
import { Scraping } from "../models/Scraping";
import { Category } from "../models/Category";

export class MercadoLivreScraping extends Scraping {

    constructor(searchList: Category[]) {
        super(searchList);
    }

    async search(search: Category): Promise<Product[]> {
        return [{ name: "", price: 0, imageSource: "", link: "", origin: SiteOriginEnum.mercadoLivre}]
    }
    
}