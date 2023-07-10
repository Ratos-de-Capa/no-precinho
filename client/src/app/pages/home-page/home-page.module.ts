import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { AppCarouselModule } from '../../../modules/carousel/carousel.module';
import { ProductListModule } from '.././../../modules/product-list/product-list.module';
import { PublicityCardModule } from 'src/modules/publicity-card/publicity-card.module';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    AppCarouselModule,
    ProductListModule,
    PublicityCardModule
  ]
})
export class HomePageModule { }
