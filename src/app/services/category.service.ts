import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

constructor(
  private httpClient: HttpClient,
  private router: Router
  ) { }

  path = 'https://localhost:44349/api/categories';

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.path);
  }

  getCategoryById(id): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.path + '?id=' + id);
  }

  setCategory(category) {
    this.httpClient.post(this.path + '/add', category).subscribe(x => this.getNavigateCategory());
  }

  updateCategory(category) {
    this.httpClient.post(this.path + '/update', category).subscribe(x => this.getNavigateCategory());
  }

  deleteCategory(id) {
    this.httpClient.post(this.path + '/delete?id=' + id, null).subscribe(x => this.getNavigateCategory());
  }

  getNavigateCategory() {
    this.router.navigateByUrl('blank', {skipLocationChange: true}).then(() => this.router.navigateByUrl('/categoryadd'));
  }

}
