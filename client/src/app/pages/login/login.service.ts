import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type LoginPayload = {
  login: string,
  password: string
}

type LoginResponse = {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://localhost:9000/auth/login';

  constructor(private _http: HttpClient) { }

  async login(loginPayload: LoginPayload) {
    try {
      const httpResponse = await this._http.post(this.url, {
        login: loginPayload.login,
        password: loginPayload.password
      }, {
        headers: this.getHeaders()
      }).toPromise() as LoginResponse;
  
      if (httpResponse.success) {
        console.log(`user: ${loginPayload.login} logged in`);
      }
    } catch (error) {
      console.error('deu pau', error)
    }
  }

  private getHeaders() {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    
    return headers;
  }
}
