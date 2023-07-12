import { PurchaseCarouselComponent } from './purchase-carousel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgImageSliderModule } from 'ng-image-slider';


@NgModule({
  declarations: [
    PurchaseCarouselComponent
  ],
  imports: [
    CommonModule,
    NgImageSliderModule
  ],
  exports: [
    PurchaseCarouselComponent
  ]
})
export class PurchaseCarouselModule { 
  
}
