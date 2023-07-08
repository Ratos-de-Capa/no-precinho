import { Product } from "./product";
import { Category } from "./category";
import { ApiService } from "../services/api";

export abstract class Scraping {
    searchList: Category[];
    foundedProducts: Product[];
    browser_minimal_args: string[]

    constructor(searchList: Category[]) {
        this.searchList = searchList;
        this.foundedProducts = [];
        this.browser_minimal_args = [
            '--autoplay-policy=user-gesture-required',
            '--disable-background-networking',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-breakpad',
            '--disable-client-side-phishing-detection',
            '--disable-component-update',
            '--disable-default-apps',
            '--disable-dev-shm-usage',
            '--disable-domain-reliability',
            '--disable-extensions',
            '--disable-features=AudioServiceOutOfProcess',
            '--disable-hang-monitor',
            '--disable-ipc-flooding-protection',
            '--disable-notifications',
            '--disable-offer-store-unmasked-wallet-cards',
            '--disable-popup-blocking',
            '--disable-print-preview',
            '--disable-prompt-on-repost',
            '--disable-renderer-backgrounding',
            '--disable-setuid-sandbox',
            '--disable-speech-api',
            '--disable-sync',
            '--hide-scrollbars',
            '--ignore-gpu-blacklist',
            '--metrics-recording-only',
            '--mute-audio',
            '--no-default-browser-check',
            '--no-first-run',
            '--no-pings',
            '--no-sandbox',
            '--no-zygote',
            '--password-store=basic',
            '--use-gl=swiftshader',
            '--use-mock-keychain',
        ]
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
        apiService.post<Product[]>("products", { data: this.foundedProducts });
    }

    abstract search(search: Category): Promise<Product[]> 
}