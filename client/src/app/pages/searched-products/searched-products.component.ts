import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/models/product.model';

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

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.queryParams.subscribe((queryParams) => {
      console.log(queryParams);
      this.searchedItem = queryParams['item'];
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}