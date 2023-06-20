import { ApiService } from "./services/ApiService";
import { Search } from "./models/Search";
import { AmazonScraping } from "./scripts/AmazonScraping";
import { MercadoLivreScraping } from "./scripts/MercadoLivreScraping";

export class Program {
    apiService: ApiService;

    constructor() {
        this.apiService = new ApiService("");
        this.start();
    }

    async start(): Promise<void> {
        console.log("Starting program...")

        const searchList: Search[] = await this.getSearch();

        console.log(`Searched list: ${searchList}`);

        this.startScraping(searchList);
    }

    async getSearch(): Promise<Search[]> {
        try {
            console.log('Getting search...')
            for (let i = 0; i < 10; i++) {
                const response = await this.apiService.get<Search[]>("search");
                
                if (!response) {
                    console.log(`Error fetching search list on attempt ${i+1}. Retrying...`);
                    continue;
                }

                return response;
            }

            throw new Error("Unable to fetch search list.");

        } catch (error) {
            console.log(error);
            throw error;            
        }
    }

    startScraping(searchList: Search[]) {
        console.log('Starting scraping...')

        const amazonScrape = new AmazonScraping(searchList);
        const mercadoLivreScrape = new MercadoLivreScraping(searchList);
        
        amazonScrape.startScraping();
        mercadoLivreScrape.startScraping();
    }
}
