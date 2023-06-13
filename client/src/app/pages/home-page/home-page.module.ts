import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { AppCarouselModule } from 'src/modules/carousel/carousel.module';
import { ProductListModule } from 'src/modules/product-list/product-list.module';
import { CategoryCardModule } from 'src/modules/category-card/category-card.module';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    AppCarouselModule,
    ProductListModule,
    CategoryCardModule
  ]
})
export class HomePageModule { }
