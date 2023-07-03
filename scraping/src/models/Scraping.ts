import { Product } from "./Product";
import { Category } from "./Category";
import { ApiService } from "../services/ApiService";

export abstract class Scraping {
    searchList: Category[];
    foundedProducts: Product[];

    constructor(searchList: Category[]) {
        this.searchList = searchList;
        this.foundedProducts = [];
    }

    async startScraping(): Promise<void> {

        let index = 0;

        for (const search of this.searchList) {
            
            if(index === 3) break;
            //console.log(`Searching for ${search.name}...`);
            console.log("starting search for: ", search);
            const result = await this.search(search);
            if (result) {
                this.foundedProducts.push(...result);
            }

            index++;
        }

        console.log('Finished scraping Amazon.')
        console.log("Founded products: ", this.foundedProducts);    

        const apiService = new ApiService("http://localhost:9000");
        console.log('Posting products...')
        apiService.post<Product[]>("products", this.foundedProducts);
    }

    abstract search(search: Category): Promise<Product[]> 
}