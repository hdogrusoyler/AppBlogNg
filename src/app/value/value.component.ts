import { Component, OnInit } from '@angular/core';
import { ValueService } from '../services/value.service';
import { Content } from '../models/content';
import { Category } from '../models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css'],
  providers: [ValueService]
})
export class ValueComponent implements OnInit {

  constructor(
    private valueService: ValueService,
    private activatedRoute: ActivatedRoute
  ) { }

  contents: Content[];
  categories: Category[];

  ngOnInit() {
    this.getCategories();

    this.activatedRoute.params.subscribe(params => {
    this.getContents(params['categoryId'], params['filterString']);
    });
  }
  getCategories() {
    this.valueService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
  getContents(categoryId, filterString) {
    if (categoryId) {
      this.valueService.getContentsByCategory(categoryId).subscribe(data => {
      this.contents = data;
      });
    } else if (filterString) {
      this.valueService.getContentsByString(filterString).subscribe(data => {
      this.contents = data;
      });
    } else {
      this.valueService.getContents().subscribe(data => {
      this.contents = data;
      });
    }
  }

}
