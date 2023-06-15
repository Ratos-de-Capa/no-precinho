import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { MaterialModule } from '../styles/material.module';


@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ProductCardComponent,
  ]
})
export class ProductCardModule { }
