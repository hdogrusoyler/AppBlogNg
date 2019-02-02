import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(
  private httpClient: HttpClient,
  private router: Router
  ) { }

  path = 'https://localhost:44349/api/users/';
  userToken: any;
  TOKEN_KEY = 'token';

  login(loginUser: User) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'login', loginUser, { headers: headers, responseType: 'text' })
      .subscribe(data => {
        this.saveToken(data);
        this.userToken = data;
        this.router.navigateByUrl('/content');
      });
  }

  register(registerUser: User) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'add', registerUser, { headers: headers })
      .subscribe(data => {});
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  loggedIn() {
    return this.token != null;
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
