import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase.component';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { MaterialModule } from 'src/modules/styles/material.module';
import { ProductInfoModule } from 'src/modules/product-info/product-info.module';
import { RelatedProductListModule } from 'src/modules/related-product-list/related-product-list.module';
import { PurchaseCarouselModule } from 'src/modules/purchase-carousel/purchase-carousel.module';
import { ProductPathModule } from 'src/modules/product-path/product-path.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 



@NgModule({
  declarations: [
    PurchaseComponent
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    MaterialModule,
    ProductInfoModule,
    RelatedProductListModule,
    PurchaseCarouselModule,
    ProductPathModule,
    NgbModule
  ]
})
export class PurchaseModule { }
