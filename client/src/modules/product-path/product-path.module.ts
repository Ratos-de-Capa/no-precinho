import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPathComponent } from './product-path.component';
import { MaterialModule } from '../styles/material.module';



@NgModule({
  declarations: [
    ProductPathComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ProductPathComponent
  ]
})
export class ProductPathModule { }
