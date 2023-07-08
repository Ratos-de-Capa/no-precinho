import { Category } from "../models/category";
import { Scraping } from "../models/scraping";
import { Info, Product } from "../models/product";
import { BasicProduct } from "../models/basic-product";
//import puppeteer from "puppeteer";
import puppeteer from "puppeteer-extra";
import { Browser } from "puppeteer";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { PuppeteerExtraPluginAdblocker} from "puppeteer-extra-plugin-adblocker"

export class AmazonScraping extends Scraping {
  browser: Browser | null;

  constructor(searchList: Category[]) {
    super(searchList);
    puppeteer.use( new PuppeteerExtraPluginAdblocker({blockTrackers: true}) );
    puppeteer.use(StealthPlugin());
    this.browser = null
  }


  async search(search: Category): Promise<Product[]> {
    const item = search.name;

    this.browser = await puppeteer.launch({ headless: true });

    const basicProducts = await this.getBasicProducts(item);

    const products: Product[] = [];

    for (let i = 0; i < basicProducts.length; i++) {
      const product = await this.getProductDetails(basicProducts[i]);
      console.log("product: ", product);
      products.push(product);
    }

    console.log("products: ", products);

    //this.browser!.close();

    return products;
  }

  async getBasicProducts(item: string): Promise<BasicProduct[]> {    
    const page = await this.browser!.newPage();

    await page.setRequestInterception(true);

    page.on("request", (req) => {
      if (
        req.resourceType() === "stylesheet" ||
        req.resourceType() === "font" ||
        req.resourceType() === "image"
      ) {
        req.abort();
      } else {
        req.continue();
      }
    })

    page.on("console", (msg) => {
      for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });

    await page.goto("https://www.amazon.com.br/s?k="+item);

    const basicProducts: BasicProduct[] = await page.evaluate(() => {
      const productElements = Array.from(
        document.querySelectorAll(".a-section.a-spacing-base")
      );

      const categorySpan = document.querySelector(
        "#departments ul span a span.a-size-base.a-color-base"
      );

      const category = categorySpan
        ? (<HTMLSpanElement>categorySpan).innerText
        : "";

      const productsAux: BasicProduct[] = [];

      for (const element of productElements) {
        const nameElement = element.querySelector<HTMLSpanElement>(
          ".a-size-base-plus.a-color-base.a-text-normal"
        );
        const priceWholeElement =
          element.querySelector<HTMLSpanElement>(".a-price-whole");
        const priceFractionElement =
          element.querySelector<HTMLSpanElement>(".a-price-fraction");
        const imageElement =
          element.querySelector<HTMLImageElement>(".s-image");
        const linkElement = element.querySelector<HTMLAnchorElement>(
          ".a-link-normal.a-text-normal"
        );
        const paymentDetailsSpan = Array.from(
          element.querySelectorAll("span.a-color-secondary")
        );
        const paymentDetailsText = paymentDetailsSpan
          .map((span) => span.textContent?.trim())
          .join(" ");

        const name = nameElement ? nameElement.innerText.trim() : "";
        const priceWhole = priceWholeElement
          ? priceWholeElement.innerText.trim()
          : "";
        const priceFraction = priceFractionElement
          ? priceFractionElement.innerText.trim()
          : "";
        const image = imageElement ? imageElement.src : "";
        const link = linkElement ? linkElement.href : "";
        const paymentDetails =
          paymentDetailsText !== ""
            ? paymentDetailsText.substring(
                paymentDetailsText.indexOf("até"),
                paymentDetailsText.indexOf("juros") + "juros".length
              )
            : "";
        const price =
          priceWhole && priceFraction
            ? parseFloat(
                `${priceWhole.replace(/\./g, "")}.${priceFraction}`.replace(
                  /[\n,]/g,
                  ""
                )
              )
            : null;

        const pushProduct = {
          name,
          price,
          imageSource: image,
          link,
          origin: "amazon",
          category,
          paymentDetails,
        } as BasicProduct;

        if (
          pushProduct.name === "" ||
          pushProduct.price === null ||
          pushProduct.imageSource === "" ||
          pushProduct.link === ""
        ) {
          continue;
        }

        productsAux.push(pushProduct);
      }

      return productsAux;
    });

    return basicProducts;
  }

  async getProductDetails(basicProduct: BasicProduct): Promise<Product> {
    console.log("starting get product details, product: ", basicProduct);

    const page = await this.browser!.newPage();

    await page.setRequestInterception(true);

    page.on("request", (req) => {
      if (
        req.resourceType() === "stylesheet" ||
        req.resourceType() === "font" ||
        req.resourceType() === "image"
      ) {
        req.abort();
      } else {
        req.continue();
      }
    })

    await page.goto(basicProduct.link);

    const descriptionAndDatasheet: Info[] = await page.evaluate(() => {
      const descriptionChildrens = document.querySelector<HTMLBodyElement>(
        "#productOverview_feature_div tbody"
      )?.children;

      const description: Info[] = [];

      if (!descriptionChildrens) {
        return description;
      }

      for (let i = 0; i < descriptionChildrens.length; i++) {
        const text = (<HTMLElement>descriptionChildrens[i]).innerText.split(
          "\t"
        );
        const info = {
          title: text[0],
          value: text[1],
        } as Info;

        description.push(info);
      }

      return description;
    });

    return { ...basicProduct, datasheet: descriptionAndDatasheet };
  }
}
