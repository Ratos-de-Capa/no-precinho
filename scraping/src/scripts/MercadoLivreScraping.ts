import { Product } from "../models/Product";
import { Scraping } from "../models/Scraping";
import { Search } from "../models/Search";

export class MercadoLivreScraping extends Scraping {

    constructor(searchList: Search[]) {
        super(searchList);
    }

    async search(search: Search): Promise<Product[]> {
        return [{ name: "", price: "", imageSource: "", link: ""}]
    }
    
}