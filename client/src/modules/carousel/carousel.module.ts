import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselComponent } from './carousel.component';


@NgModule({
  declarations: [
    CarouselComponent
  ],
  imports: [
    CommonModule,
    CarouselModule.forRoot()
  ],
  exports: [
    CarouselComponent
  ]
})
export class AppCarouselModule { }
