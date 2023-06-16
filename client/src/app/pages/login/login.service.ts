import { Injectable } from '@angular/core';

export type User = {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  save(user: User) {
    console.log('User in save method', user)
  }
}
