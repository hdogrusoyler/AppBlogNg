import { Component, OnInit } from '@angular/core';
import { ValueService } from '../services/value.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ValueService]
})
export class NavbarComponent implements OnInit {

  constructor(private valueService: ValueService) { }

  categories: Category[];

  ngOnInit() {
    this.valueService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
}
