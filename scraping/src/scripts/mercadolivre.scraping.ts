import { Product } from "../models/product";
import { Scraping } from "../models/scraping";
import { Category } from "../models/category";
import { Page } from "puppeteer";

export class MercadoLivreScraping extends Scraping {

    constructor(searchList: Category[], page: Page) {
        super(searchList, page);
    }

    async search(search: Category): Promise<Product[]> {
        const basicProducts = await this.getBasicProducts(search);

        console.log(basicProducts)

        const products: Product[] = [];

        return products;
    }

    async getBasicProducts(search: Category): Promise<Product[]> {
        await this.page.goto(`https://lista.mercadolivre.com.br/${search.subCategory.replace(' ', '-')}`)

        const basicProducts: Product[] = await this.page.evaluate(() => {
            const productElements = Array.from(document.querySelectorAll(".andes-card"));

            const productsAux: Product[] = [];
            let index = 0;

            for (const element of productElements) {
                if (index === 10) break;
                index++;
                // getting elements
                const nameElement = element.querySelector<HTMLSpanElement>(".ui-search-item__title.shops__item-title");
                const priceElement = element.querySelector<HTMLSpanElement>(".andes-money-amount__fraction");
                const imageElement = element.querySelector<HTMLImageElement>(".ui-search-result-image__element.shops__image-element");
                const linkElement = element.querySelector<HTMLAnchorElement>(".ui-search-item__group__element.shops__items-group-details.ui-search-link");
                const paymentDetailsSpan = Array.from(element.querySelectorAll(".ui-search-installments"));
                const paymentDetailsText = paymentDetailsSpan.map((div) => div.textContent?.trim()).join(" ");
                const ratingSpan = element.querySelector<HTMLSpanElement>(".ui-search-reviews__amount");
                const evaluationsSpan = element.querySelector<HTMLSpanElement>("span.a-size-base.s-underline-text");
                const percentOffSpan = element.querySelector<HTMLSpanElement>('ui-search-price__discount.shops__price-discount');

                // creating product object
                const name = nameElement ? nameElement.innerText.trim() : "";
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
                const price = priceElement?.innerText ? +priceElement?.innerText : "";

                const percentOff = percentOffSpan?.innerText ? +percentOffSpan?.innerText.split(' ')[0] : 0;
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
                    origin: "mercado_livre",
                    paymentDetails,
                    reviews,
                    percentOff,
                } as Product);
            }

            return productsAux;
        });

        return basicProducts.map(product => ({
            ...product,
            category: search
        }));
    }

    async getProductDetails(product: Product): Promise<Product> {
        await this.page.goto(product.link);

        const productDetails = await this.page.evaluate(() => {
            return {};
        });

        return {
            ...product,
            ...productDetails
        };
    }
}