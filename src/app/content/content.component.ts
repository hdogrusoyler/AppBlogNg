import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { Content } from '../models/content';
import { Category } from '../models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [ContentService]
})
export class ContentComponent implements OnInit {

  constructor(
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute
    ) { }

  contents: Content[];
  categories: Category[];

  ngOnInit() {
    this.getCategories();

    this.activatedRoute.params.subscribe(params => {
    this.getContents(params['contentCategoryId'], params['contentFilterString']);
    });
  }
  getCategories() {
    this.contentService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
  getContents(categoryId, filterString) {
    if (categoryId) {
      this.contentService.getContentsByCategory(categoryId).subscribe(data => {
      this.contents = data;
      });
    } else if (filterString) {
      this.contentService.getContentsByString(filterString).subscribe(data => {
      this.contents = data;
      });
    } else {
      this.contentService.getContents().subscribe(data => {
      this.contents = data;
      });
    }
  }

  logOut() {
    this.contentService.logOut();
  }

  get isAuthenticated() {
    return this.contentService.loggedIn();
  }
}
