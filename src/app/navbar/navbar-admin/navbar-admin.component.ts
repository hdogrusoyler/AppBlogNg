import { Component, OnInit } from '@angular/core';
import { ValueService } from 'src/app/services/value.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css'],
  providers: [ValueService]
})
export class NavbarAdminComponent implements OnInit {

  constructor(private valueService: ValueService) { }

  categories: Category[];

  ngOnInit() {
    this.valueService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  logOut() {
    this.valueService.logOut();
  }

  get isAuthenticated() {
    return this.valueService.loggedIn();
  }

}
