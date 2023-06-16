import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatedProductCardComponent } from './related-product-card/related-product-card.component';
import { RelatedProductListComponent } from './related-product-list.component';
import { MaterialModule } from '../styles/material.module';



@NgModule({
  declarations: [
    RelatedProductListComponent,
    RelatedProductCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    RelatedProductListComponent,
    RelatedProductCardComponent
  ]
})
export class RelatedProductListModule { }
