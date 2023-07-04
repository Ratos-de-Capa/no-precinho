import { Category } from "../models/category";
import { Scraping } from "../models/scraping";
import puppeteer, { Page } from "puppeteer";
import { Info, Product } from "../models/product";
import { BasicProduct } from "../models/basic-product";

export class AmazonScraping extends Scraping {
  constructor(searchList: Category[]) {
    super(searchList);
  }

  async search(search: Category): Promise<Product[]> {
    const item = search.name;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // const url = `https://www.amazon.com.br/s?k=${item}`;
    // await page.goto(url);

    page.on('console', (msg) => {
      for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });

    // const basicProducts: BasicProduct[] = await page.evaluate(() => {
    //   const productElements = Array.from(
    //     document.querySelectorAll(".a-section.a-spacing-base")
    //   );

    //   const productsAux: BasicProduct[] = [];

    //   for (const element of productElements) {
    //     const nameElement = element.querySelector<HTMLSpanElement>(".a-size-base-plus.a-color-base.a-text-normal");
    //     const priceWholeElement = element.querySelector<HTMLSpanElement>(".a-price-whole");
    //     const priceFractionElement = element.querySelector<HTMLSpanElement>(".a-price-fraction");
    //     const imageElement = element.querySelector<HTMLImageElement>(".s-image");
    //     const linkElement = element.querySelector<HTMLAnchorElement>(".a-link-normal.a-text-normal");

    //     const name = nameElement ? nameElement.innerText.trim() : "";
    //     const priceWhole = priceWholeElement ? priceWholeElement.innerText.trim() : "";
    //     const priceFraction = priceFractionElement ? priceFractionElement.innerText.trim() : "";
    //     const image = imageElement ? imageElement.src : "";
    //     const link = linkElement ? linkElement.href : "";

    //     // //const price = priceWhole && priceFraction ? `${priceWhole}.${priceFraction}` : '';
    //     const price = priceWhole && priceFraction ? parseFloat(`${priceWhole.replace(/\./g, '')}.${priceFraction}`.replace(/[\n,]/g, "")) : null;

    //     const pushProduct = {
    //       name,
    //       price,
    //       imageSource: image,
    //       link,
    //     } as BasicProduct;

    //     if (pushProduct.name === '' || pushProduct.price === null || pushProduct.imageSource === '' || pushProduct.link === '') {
    //       continue;
    //     }

    //     productsAux.push(pushProduct) 
    //   }

    //   return productsAux;
    // });
    const basicProducts = await this.getBasicProducts(item, page);

    const products: Product[] = await this.getProductsDetails(basicProducts, page);

    console.log("products: ", products);

    return products;
  }

  async getBasicProducts(item: string, page: Page): Promise<BasicProduct[]> {
    const url = `https://www.amazon.com.br/s?k=${item}`;
    await page.goto(url);

    page.on('console', (msg) => {
      for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });

    const basicProducts: BasicProduct[] = await page.evaluate(() => {
      const productElements = Array.from(
        document.querySelectorAll(".a-section.a-spacing-base")
      );

      const productsAux: BasicProduct[] = [];

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

        // //const price = priceWhole && priceFraction ? `${priceWhole}.${priceFraction}` : '';
        const price = priceWhole && priceFraction ? parseFloat(`${priceWhole.replace(/\./g, '')}.${priceFraction}`.replace(/[\n,]/g, "")) : null;

        const pushProduct = {
          name,
          price,
          imageSource: image,
          link,
          origin: "amazon"
        } as BasicProduct;

        if (pushProduct.name === '' || pushProduct.price === null || pushProduct.imageSource === '' || pushProduct.link === '') {
          continue;
        }

        productsAux.push(pushProduct) 
      }

      return productsAux;
    });


    return basicProducts;
  }

  async getProductsDetails(basicProducts: BasicProduct[], page: Page): Promise<Product[]> {
    const products: Promise<Product>[] = basicProducts.map(async (basicProduct) => {
      await page.goto(basicProduct.link);
      
      const product: Product = await page.evaluate(() => {
        const descriptionChildrens = document.querySelector<HTMLBodyElement>("#productOverview_feature_div tbody")?.children;

        if(!descriptionChildrens) {
          return {
            ...basicProduct
          }
        }
        
        const description: Info[] = [];

        for (let i = 0; i < descriptionChildrens.length; i++) {
          const text =(<HTMLElement>descriptionChildrens[i]).innerText.split('\t');
          const info = {
            title: text[0],
            value: text[1]
          } as Info;

          description.push(info);
        }

        const product = {
          ...basicProduct,
          description
        } as Product;

        return product;
      });

      return product;
    });

    return Promise.all(products);
  }
}
