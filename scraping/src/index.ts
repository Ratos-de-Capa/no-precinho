import { ApiService } from "./services/api";
import { Category } from "./models/category";
import { AmazonScraping } from "./scripts/amazon.scraping";
import { MercadoLivreScraping } from "./scripts/mercadolivre.scraping";

export class Program {
    apiService: ApiService;

    constructor() {
        this.apiService = new ApiService("http://localhost:9000");
        this.start();
    }

    async start(): Promise<void> {
        console.log("Starting program...")

        const searchList: Category[] = await this.getSearch();

        //console.log(`Searched list: ${searchList}`);

        await this.startScraping(searchList);
    }

    async getSearch(): Promise<Category[]> {
        try {
            console.log('Getting search...')
            for (let i = 0; i < 10; i++) {
                const response = await this.apiService.get<Category[]>("categories");
                
                if (!response) {
                    console.log(`Error fetching search list on attempt ${i+1}. Retrying...`);
                    continue;
                }

                console.log("get search response: ", response);
            
                return response;
            }

            throw new Error("Unable to fetch search list.");

        } catch (error) {
            console.log(error);
            throw error;            
        }
    }

    async startScraping(searchList: Category[]) {
        console.log('Starting scraping...')

        const amazonScrape = new AmazonScraping(searchList);
        const mercadoLivreScrape = new MercadoLivreScraping(searchList);
        
        await amazonScrape.startScraping();
        //mercadoLivreScrape.startScraping();
    }
}

new Program();