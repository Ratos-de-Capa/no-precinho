import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchedProductsRoutingModule } from './searched-products-routing.module';
import { MaterialModule } from 'src/modules/styles/material.module';
import { SearchedProductsComponent } from './searched-products.component';
import { ProductCardModule } from 'src/modules/product-card/product-card.module';

@NgModule({
  declarations: [ 
    SearchedProductsComponent
  ],
  imports: [
    CommonModule,
    SearchedProductsRoutingModule,
    MaterialModule,
    ProductCardModule
  ]
})
export class SearchedProductsModule { }
