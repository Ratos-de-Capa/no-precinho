import { Injectable } from '@angular/core';
import { ApiService } from 'src/modules/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private apiService: ApiService) { }

  getProductById(id: string) {
    return this.apiService.get(`/products/${id}`);
  }

  getProductByCategory(category: string) {
    return this.apiService.get(`/products/${category.toLowerCase()}`);
  }

}
