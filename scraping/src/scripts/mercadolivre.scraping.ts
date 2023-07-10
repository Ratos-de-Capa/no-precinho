import { Product } from "../models/product";
import { Scraping } from "../models/scraping";
import { Category } from "../models/category";
import { Page } from "puppeteer";

export class MercadoLivreScraping extends Scraping {

    constructor(searchList: Category[], page: Page) {
        super(searchList, page);
    }

    async search(search: Category): Promise<Product[]> {
        return []
    }
    
}