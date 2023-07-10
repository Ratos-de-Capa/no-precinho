import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  constructor(private httpclient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
        'Content-type': 'application/json',
        'X-CSCAPI-KEY': 'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg=='
    })
    };

    getStateOfSelectedCountry(): Observable<any>{
      return this.httpclient.get(`https://api.countrystatecity.in/v1/countries/BR/states`,{headers: this.httpOptions.headers} )
    };
  
    getCitiesOfSelectedState(stateIso: any): Observable<any>{
      return this.httpclient.get(`https://api.countrystatecity.in/v1/countries/BR/states/${stateIso}/cities`, {headers: this.httpOptions.headers} )
    };

}
