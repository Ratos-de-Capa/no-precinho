import { ApiService } from "./services/api";
import { Category } from "./models/category";
import { AmazonScraping } from "./scripts/amazon.scraping";
import { MercadoLivreScraping } from "./scripts/mercadolivre.scraping";
import { Browser } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { PuppeteerExtraPluginAdblocker } from "puppeteer-extra-plugin-adblocker";
import { Scraping } from "./models/scraping";

export class Program {
  apiService: ApiService;
  browser: Browser | null;

  constructor() {
    this.apiService = new ApiService("http://172.17.0.1:9000"); // TODO: get from env
    this.browser = null;
    puppeteer.use(new PuppeteerExtraPluginAdblocker({ blockTrackers: true }));
    puppeteer.use(StealthPlugin());

    this.start();
  }

  async start(): Promise<void> {
    console.log("Starting program...");

    this.browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome',
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true
    });

    console.log("browser version: ", await this.browser.version());

    const searchList: Category[] = await this.getSearch();

    await this.startScraping(searchList);

    await this.browser.close();
  }

  async getSearch(): Promise<Category[]> {
    try {
      console.log("Getting search...");
      for (let i = 0; i < 10; i++) {
        const response = await this.apiService.get<Category[]>("categories");

        if (!response) {
          console.log(`Error fetching search list on attempt ${i + 1}. Retrying...`);
          continue;
        }

        console.log("get search response: ", response);

        return response;
      }

      throw new Error("Unable to fetch search list.");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async startScraping(searchList: Category[]) {
    console.log("Starting scraping...");

    if (this.browser) {
      const scrapings: Scraping[] = [];

      // Criar todas as páginas necessárias
      const amazonPage = await this.browser.newPage();
      const mercadolivrePage = await this.browser.newPage();

      const amazonScraping = new AmazonScraping(searchList, amazonPage);
      const mercadolivreScraping = new MercadoLivreScraping(searchList, mercadolivrePage);

      scrapings.push(amazonScraping, mercadolivreScraping);

      const scrapingPromises = scrapings.map((scraping) => scraping.startScraping());

      await Promise.all(scrapingPromises); // Aguardar todas as promessas serem concluídas
    } else console.error("Browser is null.");
  }
}

new Program();
