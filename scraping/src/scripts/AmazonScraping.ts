import { Search } from "../models/Search";
import { Scraping } from "../models/Scraping";
import puppeteer from "puppeteer";
import { Product } from "../models/Product";

export class AmazonScraping extends Scraping {
  constructor(searchList: Search[]) {
    super(searchList);
  }

  async search(search: Search): Promise<Product[]> {
    const item = search.name;
    console.log("starting finding item: ", item);

    const browser = await puppeteer.launch();
    console.log("browser: ", browser);

    const page = await browser.newPage();
    console.log("page: ", page);

    const url = `https://www.amazon.com.br/s?k=${item}`;

    await page.goto(url);

    await page.waitForSelector(".a-price-whole");

    const products: Product[] = await page.evaluate(() => {
      const productElements = Array.from(
        document.querySelectorAll(".a-section.a-spacing-base")
      );
      const productsAux: Product[] = [];

      for (const element of productElements) {
        const nameElement = element.querySelector<HTMLSpanElement>(".a-size-base-plus.a-color-base.a-text-normal");
        const priceWholeElement = element.querySelector<HTMLSpanElement>(".a-price-whole");
        const priceFractionElement = element.querySelector<HTMLSpanElement>(".a-price-fraction");
        const imageElement = element.querySelector<HTMLImageElement>(".s-image");
        const linkElement = element.querySelector<HTMLAnchorElement>(".a-link-normal.a-text-normal");

        const name = nameElement ? nameElement.innerText.trim() : "";
        const priceWhole = priceWholeElement ? priceWholeElement.innerText.trim() : "";
        const priceFraction = priceFractionElement ? priceFractionElement.innerText.trim() : "";
        const image = imageElement ? imageElement.src : "";
        const link = linkElement ? linkElement.href : "";

        //const price = priceWhole && priceFraction ? `${priceWhole}.${priceFraction}` : '';
        const price: string = priceWhole && priceFraction ? `${priceWhole}.${priceFraction}`.replace(/[\n,]/g, "") : "";

        productsAux.push({
            name: name,
            price: price,
            imageSource: image,
            link: link,
        })        
    }

      return productsAux;
    });

    await browser.close();

    return products;
  }
}
