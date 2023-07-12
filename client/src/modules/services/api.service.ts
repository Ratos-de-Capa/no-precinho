import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private url = '/server';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private _http: HttpClient) {}

  async post(path: string, payload?: any): Promise<any> {
    const url = this.url + path;
    return await this._http.post(url, payload, this.httpOptions).toPromise();
  }

  async get(path: string): Promise<any> {
    return await this._http.get(this.url + path).toPromise();
  }
}
