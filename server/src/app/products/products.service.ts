import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import puppeteer from 'puppeteer';

export interface IProducts {
  name: string;
  price: string;
  imageSource: string;
  link: string;
}

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    throw new Error('Method not implemented.');
  }

  findAll() {
    return `This action returns all products`;
  }

  async findOne(item: string) {
    console.log('starting finding item: ', item);

    const browser = await puppeteer.launch();
    console.log('browser: ', browser);

    const page = await browser.newPage();
    console.log('page: ', page);

    const url = `https://www.amazon.com.br/s?k=${item}`;

    await page.goto(url);

    await page.waitForSelector('.a-price-whole');

    const products: IProducts[] = await page.evaluate(() => {
      const productElements = Array.from(
        document.querySelectorAll('.a-section.a-spacing-base'),
      );
      const productsAux = [];

      for (const element of productElements) {
        const nameElement: HTMLSpanElement = element.querySelector(
          '.a-size-base-plus.a-color-base.a-text-normal',
        );
        const priceWholeElement: HTMLSpanElement =
          element.querySelector('.a-price-whole');
        const priceFractionElement: HTMLSpanElement =
          element.querySelector('.a-price-fraction');
        const imageElement: HTMLImageElement =
          element.querySelector('.s-image');
        const linkElement: HTMLAnchorElement = element.querySelector(
          '.a-link-normal.a-text-normal',
        );

        const name = nameElement ? nameElement.innerText.trim() : '';
        const priceWhole = priceWholeElement
          ? priceWholeElement.innerText.trim()
          : '';
        const priceFraction = priceFractionElement
          ? priceFractionElement.innerText.trim()
          : '';
        const image = imageElement ? imageElement.src : '';
        const link = linkElement ? linkElement.href : '';

        //const price = priceWhole && priceFraction ? `${priceWhole}.${priceFraction}` : '';
        const price: string =
          priceWhole && priceFraction
            ? `${priceWhole}.${priceFraction}`.replace(/[\n,]/g, '')
            : '';

        productsAux.push({ name, price, image, link });
      }

      return productsAux;
    });

    await browser.close();

    return products;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
