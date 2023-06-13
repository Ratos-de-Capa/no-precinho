import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { MaterialModule } from '../styles/material.module';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ProductListComponent,
    ProductCardComponent
  ]
})
export class ProductListModule { }
