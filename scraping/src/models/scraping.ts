import { Product } from "./product";
import { Category } from "./category";
import { ApiService } from "../services/api";
import { Browser, Page } from "puppeteer";

export abstract class Scraping {
  categories: Category[];
  foundedProducts: Product[];
  page: Page;

  constructor(searchList: Category[], page: Page) {
    this.categories = searchList;
    this.foundedProducts = [];
    this.page = page;
  }

  async startScraping(): Promise<void> {
    const apiService = new ApiService("http://172.17.0.1:9000");
    let index = 0;
    await this.page.setRequestInterception(true);

    this.page.on("request", (req) => {
      if (req.resourceType() === "stylesheet" || req.resourceType() === "font" || req.resourceType() === "image") {
        req.abort();
      } else {
        req.continue();
      }
    });

    this.page.on("console", (msg) => {
      for (let i = 0; i < msg.args().length; ++i) console.log(`${i}: ${msg.args()[i]}`);
    });

    for (const category of this.categories) {
      console.log(`Searching for ${category.subCategory}...`);
      console.log("starting search for: ", category);
      const result = await this.search(category);
      if (result) {
        console.log("Posting products...");
        console.log("result: ", result);
        await apiService.post<Product[]>("products", { data: result });
      }
    }
  }

  abstract search(search: Category): Promise<Product[]>;
}
