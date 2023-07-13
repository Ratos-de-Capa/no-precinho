import { Injectable } from '@angular/core';
import { ApiService } from 'src/modules/services/api.service';

export type LoginPayload = {
  login: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  message: string;
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private uri = '/auth/';

  constructor(private apiService: ApiService) {}

  async login(loginPayload: LoginPayload): Promise<LoginResponse> {
    const endpoint = `${this.uri}login`;

    return await this.apiService.post(endpoint, loginPayload);
  }
}
