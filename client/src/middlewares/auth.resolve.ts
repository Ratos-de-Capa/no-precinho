import { Injectable } from '@angular/core';
import { ApiService } from 'src/modules/services/api.service';

@Injectable({ providedIn: 'root' })
export class AuthResolve {
  constructor(private apiService: ApiService) {}

  async resolve() {
    const endpoint = 'auth/validate';

    return this.apiService.get(endpoint);
  }
}
