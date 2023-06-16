import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { MaterialModule } from '../styles/material.module';
import { ProductCardModule } from '../product-card/product-card.module';


@NgModule({
  declarations: [
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProductCardModule
  ],
  exports: [
    ProductListComponent,
  ]
})
export class ProductListModule { }
