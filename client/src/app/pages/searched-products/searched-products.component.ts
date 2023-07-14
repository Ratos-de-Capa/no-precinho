import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/models/product.model';
import { ToastrService } from 'src/modules/toastr-module';
import { SearchedProductsService } from './searched-products.service';
import { ProductsFilter } from 'src/models/products-filter.model';

@Component({
  selector: 'app-searched-products',
  templateUrl: './searched-products.component.html',
  styleUrls: ['./searched-products.component.scss'],
})
export class SearchedProductsComponent implements OnInit, OnDestroy {
  @Input() products: Product[] = [];

  brands: string[] = [];
  sub: Subscription;

  filter: ProductsFilter = {
    name: '',
    category: '',
    subCategory: '',
    brand: [],
    origin: '',
    minPrice: 0,
    maxPrice: 15000,
    skip: 0,
    limit: 20,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchedProductService: SearchedProductsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.queryParams.subscribe(
      async (queryParams) => {
        console.log('queryParams', queryParams);

        this.filter.name = queryParams['item'];
        this.filter.category = queryParams['category'];
        this.filter.subCategory = queryParams['sub-category'];
        this.filter.origin = queryParams['origin'];

        if (queryParams['min-price']) {
          this.filter.minPrice = queryParams['min-price'];
        }

        if (queryParams['max-price']) {
          this.filter.maxPrice = queryParams['max-price'];
        }

        if (queryParams['brand'] === 'undefined') {
          this.filter.brand = [];
        } else {
          this.filter.brand = queryParams['brand'].split('-');
        }

        await this.listProducts();
      }
    );
  }

  async listProducts() {
    try {
      this.products = await this.searchedProductService.listProducts(
        this.filter
      );
      this.updateBrands();
    } catch (error) {
      this.toastr.danger('Erro ao listar produtos', 'Erro');
    }
  }

  updateBrands(): void {
    this.brands = [];

    for (const product of this.products) {
      const { datasheet } = product;
      if (!datasheet || datasheet.length === 0) {
        continue;
      }

      datasheet.filter((data) => data.key === 'Marca');

      const brand = datasheet[0].value;

      if (!this.brands.includes(brand)) {
        this.brands.push(brand);
      }

      this.brands.sort();
    }
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
