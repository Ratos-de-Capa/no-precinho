import { Product } from "./product";
import { Category } from "./category";
import { ApiService } from "../services/api";
import { Browser, Page } from "puppeteer";

export abstract class Scraping {
  searchList: Category[];
  foundedProducts: Product[];
  page: Page;

  constructor(searchList: Category[], page: Page) {
    this.searchList = searchList;
    this.foundedProducts = [];
    this.page = page;
  }

  async startScraping(): Promise<void> {
    let index = 0;
    await this.page.setRequestInterception(true);

    this.page.on("request", (req) => {
      if (
        req.resourceType() === "stylesheet" ||
        req.resourceType() === "font" ||
        req.resourceType() === "image"
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    this.page.on("console", (msg) => {
      for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });

    for (const search of this.searchList) {
      if (index === 3) break;
      //console.log(`Searching for ${search.name}...`);
      console.log("starting search for: ", search);
      const result = await this.search(search);
      if (result) {
        this.foundedProducts.push(...result);
      }

      index++;
    }

    console.log("Finished scraping Amazon.");
    console.log("Founded products: ", this.foundedProducts);

    const apiService = new ApiService("http://localhost:9000");
    console.log("Posting products...");
    apiService.post<Product[]>("products", { data: this.foundedProducts });
  }

  abstract search(search: Category): Promise<Product[]>;
}
