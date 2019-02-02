import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  loginUser: any = {};

  ngOnInit() {
  }

  login() {
    this.userService.login(this.loginUser);
  }

  logOut() {
    this.userService.logOut();
  }

  logRegister() {
    this.userService.register(this.loginUser);
  }

  get isAuthenticated() {
    return this.userService.loggedIn();
  }

}
