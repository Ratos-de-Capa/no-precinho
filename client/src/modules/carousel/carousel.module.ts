import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselComponent } from './carousel.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CarouselComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule.forRoot()
  ],
  exports: [
    CarouselComponent
  ]
})
export class AppCarouselModule { }
