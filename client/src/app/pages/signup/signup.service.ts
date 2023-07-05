import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

type User = {
  id?: string,
  login: string,
  email: string,
  name: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private url = 'http://localhost:9000/users/create';

  constructor(private _http: HttpClient) { }

  async createUser({ email, login, password, name }: User) {
    try {
      const httpResponse = await this._http.post(this.url, {
        name,
        login,
        email,
        password
      }, {
        headers: this.getHeaders()
      }).toPromise();
  
      if (httpResponse['success']) {
        console.log(`user: ${login} created`);
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
