import { Injectable } from '@angular/core';
import { ApiService } from 'src/modules/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private apiService: ApiService) { }

  async listAds() {
    return await this.apiService.get('/ads');
  }

  async listWeekHighlights() {
    return await this.apiService.get('/product/week-highlights');
  }

  async listPopularProducts() {
    return await this.apiService.get('/product/popular-products');
  }

}
