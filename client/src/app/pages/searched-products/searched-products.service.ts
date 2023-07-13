import { Injectable } from '@angular/core';
import { Product } from 'src/models/product.model';
import { ApiService } from 'src/modules/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchedProductsService {
  constructor(private apiService: ApiService) {}

  async listSearchedProducts(searchedItem: string): Promise<Product[]> {
    return await this.apiService.get(
      `/products/search/${searchedItem}`
    );
  }
}
