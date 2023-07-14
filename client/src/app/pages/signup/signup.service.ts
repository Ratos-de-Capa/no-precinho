import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
  private url = 'http://localhost:9000/users';

  constructor(private _http: HttpClient) { }

  async createUser({ email, login, password, name }: User): Promise<[boolean, string]> {
    try {
      const httpResponse = await this._http.post(this.url, {
        name,
        login,
        email,
        password
      }, {
        headers: this.getHeaders()
      }).toPromise();

      console.log(httpResponse);
  
      if (httpResponse) {
        return [true, `Usuário: ${login} criado com sucesso!`];
      }
      return [false, 'Erro ao criar usuário!'];
    } catch (error) {
      console.log(error);
      return [false, 'Erro ao criar usuário!'];
    }
  }

  private getHeaders() {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    
    return headers;
  }
}
