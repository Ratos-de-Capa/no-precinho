import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { AppCarouselModule } from 'src/modules/carousel/carousel.module';
import { ProductListModule } from 'src/modules/product-list/product-list.module';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    AppCarouselModule,
    ProductListModule
  ]
})
export class HomePageModule { }
