import { Injectable } from '@angular/core';
import { Session } from 'src/models/session.interface';
import { ApiService } from 'src/modules/services/api.service';

@Injectable({ providedIn: 'root' })
export class AuthResolver {
  constructor(private apiService: ApiService) {}

  async resolve(): Promise<Session> {
    const endpoint = '/auth/getSession';

    try {
      const session = await this.apiService.get(endpoint);
      return session;
    } catch (error) {
      console.error('AuthResolver error: ', error);
      return null;
    }
  }
}
