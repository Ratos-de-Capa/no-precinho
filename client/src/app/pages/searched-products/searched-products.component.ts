import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/models/product.model';
import { ToastrService } from 'src/modules/toastr-module';
import { SearchedProductsService } from './searched-products.service';

@Component({
  selector: 'app-searched-products',
  templateUrl: './searched-products.component.html',
  styleUrls: ['./searched-products.component.scss'],
})
export class SearchedProductsComponent implements OnInit, OnDestroy {
  @Input() products: Product[] = [];

  brands: string[] = [];

  searchedItem: string;
  sub: Subscription;

  minPrice: number = 0;
  maxPrice: number = 15000;

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchedProductService: SearchedProductsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.queryParams.subscribe((queryParams) => {
      console.log(queryParams);
      this.searchedItem = queryParams['item'];
      this.listSearchedProducts();
    });
  }

  async listSearchedProducts(): Promise<void> {
    try {
      this.products = await this.searchedProductService.listSearchedProducts(
        this.searchedItem
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
