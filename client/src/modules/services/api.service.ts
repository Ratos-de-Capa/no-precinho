import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  //private url = '/server';

  private url = 'http://localhost:9000';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }, ),
  };

  constructor(private _http: HttpClient) {}

  async post(path: string, payload?: any): Promise<any> {
    const url = this.url + path;
    console.log('payload', payload);
    
    return firstValueFrom(this._http.post(url, payload, this.httpOptions));
  }

  async get(path: string): Promise<any> {
    return firstValueFrom(this._http.get(this.url + path));
  }
}
