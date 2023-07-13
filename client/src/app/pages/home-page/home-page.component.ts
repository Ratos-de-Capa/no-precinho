import { Component, OnInit } from '@angular/core';
import { HomePageService } from './home-page.service';
import { Publicity } from '../../../modules/publicity-card/models/publicity.model';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  ads: Publicity[] = [];
  weekHighlights: Product[] = [];
  popularProducts: Product[] = [];

  constructor(private homePageService: HomePageService) {}

  ngOnInit(): void {
    this.initPublicities();
    this.initWeekHighlights();
    this.initPopularProducts();
  }

  async initPublicities() {
    try {
      const response = await this.homePageService.listAds();
      this.ads = response;
    } catch (error) {
      console.log(error);
    }
  }

  async initWeekHighlights() {
    try {
      const response = await this.homePageService.listWeekHighlights();
      this.weekHighlights = response;
    } catch (error) {
      console.log(error);
    }
  }

  async initPopularProducts() {
    try {
      const response = await this.homePageService.listPopularProducts();
      this.popularProducts = response;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
