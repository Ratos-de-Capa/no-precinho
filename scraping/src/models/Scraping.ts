import { Product } from "./Product";
import { Search } from "./Search";

export abstract class Scraping {
    searchList: Search[];

    constructor(searchList: Search[]) {
        this.searchList = searchList;
    }

    async startScraping(): Promise<void> {
        console.log('Starting scraping Amazon...')

        for (const search of this.searchList) {
            console.log(`Searching for ${search.name}...`);
            await this.search(search);
        }
    }

    abstract search(search: Search): Promise<Product[]> 
}