import { Injectable } from '@angular/core';
import { Product } from 'src/models/product.model';
import { ApiService } from 'src/modules/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private apiService: ApiService) { }

  async listAds() {
    return await this.apiService.get('/ads');
  }

  async listWeekHighlights(): Promise<Product[]> {
    return await this.apiService.get('/products/week-highlights/0/5');
  }

  async listPopularProducts(): Promise<Product[]> {
    return await this.apiService.get('/products/popular-products/0/5');
  }

}
