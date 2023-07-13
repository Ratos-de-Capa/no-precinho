import { Injectable } from '@angular/core';
import { Product } from 'src/models/product.model';
import { ApiService } from 'src/modules/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchedProductsService {
  constructor(private apiService: ApiService) {}

  async listSearchedProducts(searchedItem: string): Promise<Product[]> {
    return await this.apiService.get(`/products/search/${searchedItem}`);
  }

  async listProductsByCategory(category: string, skip = 0, limit = 20): Promise<Product[]> {
    return this.apiService.post(`/products/category`, { category, skip, limit });
  }
}
