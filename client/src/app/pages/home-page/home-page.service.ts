import { Injectable } from '@angular/core';
import { ApiService } from 'src/modules/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private apiService: ApiService) { }

  getProducts() {
    return this.apiService.makeGetRequest('/products/');
  }

}