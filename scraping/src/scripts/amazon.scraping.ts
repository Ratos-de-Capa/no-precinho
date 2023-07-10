import { Category } from "../models/category";
import { Scraping } from "../models/scraping";
import { Info, Product } from "../models/product";
import { Page } from "puppeteer";

export class AmazonScraping extends Scraping {
  constructor(searchList: Category[], page: Page) {
    super(searchList, page);
  }

  async search(search: Category): Promise<Product[]> {
    const basicProducts = await this.getBasicProducts(search);

    const products: Product[] = [];

    for (let i = 0; i < basicProducts.length; i++) {
      const product: Product = await this.getProductDetails(basicProducts[i]);
      console.log("product: ", product);
      products.push(product);
    }

    return products;
  }

  async getBasicProducts(search: Category): Promise<Product[]> {
    await this.page.goto("https://www.amazon.com.br/s?k=" + search.subCategory);

    const basicProducts: Product[] = await this.page.evaluate(() => {
      const productElements = Array.from(document.querySelectorAll(".a-section.a-spacing-base"));

      const productsAux: Product[] = [];
      let index = 0;

      for (const element of productElements) {
        if (index === 10) break;
        index++;
        // getting elements
        const nameElement = element.querySelector<HTMLSpanElement>(".a-size-base-plus.a-color-base.a-text-normal");
        const priceWholeElement = element.querySelector<HTMLSpanElement>(".a-price-whole");
        const priceFractionElement = element.querySelector<HTMLSpanElement>(".a-price-fraction");
        const imageElement = element.querySelector<HTMLImageElement>(".s-image");
        const linkElement = element.querySelector<HTMLAnchorElement>(".a-link-normal.a-text-normal");
        const paymentDetailsSpan = Array.from(element.querySelectorAll("span.a-color-secondary"));
        const paymentDetailsText = paymentDetailsSpan.map((span) => span.textContent?.trim()).join(" ");
        const ratingSpan = element.querySelector<HTMLSpanElement>(".a-icon-alt");
        const evaluationsSpan = element.querySelector<HTMLSpanElement>("span.a-size-base.s-underline-text");
        const oldPriceSpan = element.querySelector<HTMLSpanElement>("span.a-price.a-text-price > span");

        // creating product object
        const name = nameElement ? nameElement.innerText.trim() : "";
        const priceWhole = priceWholeElement ? priceWholeElement.innerText.trim() : "";
        const priceFraction = priceFractionElement ? priceFractionElement.innerText.trim() : "";
        const image = imageElement ? imageElement.src : "";
        const link = linkElement ? linkElement.href : "";
        const rating = ratingSpan ? parseFloat(ratingSpan.innerText.split(" ")[0].replace(",", ".")) : null;
        const evaluations = evaluationsSpan ? parseInt(evaluationsSpan.innerText.replace(/\./g, "")) : null;
        const reviews = rating && evaluations ? { rating, evaluations } : null;
        const paymentDetails =
          paymentDetailsText !== "" && paymentDetailsText.includes("até")
            ? paymentDetailsText.substring(
                paymentDetailsText.indexOf("até"),
                paymentDetailsText.indexOf("juros") + "juros".length
              )
            : null;
        const price =
          priceWhole && priceFraction
            ? parseFloat(`${priceWhole.replace(/\./g, "")}.${priceFraction}`.replace(/[\n,]/g, ""))
            : null;
        const oldPrice = oldPriceSpan
          ? parseFloat(oldPriceSpan.innerText.replace(/[R$\s.]/g, "").replace(",", "."))
          : null;

        const percentOff = oldPrice && price ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;

        // validating product object
        if (name === "" || price === null || image === "" || link === "") {
          continue;
        }

        // adding product object to array
        productsAux.push({
          name,
          price,
          coverImageSrc: image,
          link,
          origin: "amazon",
          paymentDetails,
          reviews,
          percentOff,
        } as Product);
      }

      return productsAux;
    });

    return basicProducts.map((product) => ({ ...product, category: search }));
  }

  async getProductDetails(product: Product): Promise<Product> {

    await this.page.goto(product.link);

    const productDetails = await this.page.evaluate(() => {
      // getting elements
      const datasheetChildrens = document.querySelector<HTMLBodyElement>("#productOverview_feature_div tbody")?.children;
      const descriptionElement = document.querySelector<HTMLSpanElement>("#productDescription > p > span");
      const images = document.querySelectorAll<HTMLImageElement>("#altImages > ul > li.a-spacing-small.item img")

      // creating product object
      const imagesSrc = images && images.length > 0 ? Array.from(images).map((img) => img.src) : null;
      const description = descriptionElement ? descriptionElement.innerText : null;
      const datasheet: Info[] = [];

      if (!datasheetChildrens) {
        return datasheet;
      }

      for (let i = 0; i < datasheetChildrens.length; i++) {
        const text = (<HTMLElement>datasheetChildrens[i]).innerText.split("\t");
        const info = {
          title: text[0],
          value: text[1],
        } as Info;

        datasheet.push(info);
      }

      return {
        datasheet, 
        description,
        imagesSrc
      } as any;
    });

    const newProduct = { ...product, ...productDetails };

    return newProduct;
  }
}
