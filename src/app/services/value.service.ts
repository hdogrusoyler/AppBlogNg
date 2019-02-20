import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Content } from '../models/content';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

constructor(
  private httpClient: HttpClient,
  private router: Router
  ) { }

  path = 'https://localhost:44349/api/values';

  TOKEN_KEY = 'token';

  getContents(): Observable<Content[]> {
    return this.httpClient.get<Content[]>(this.path + '/');
  }

  getContentsByCategory(categoryId): Observable<Content[]> {
    return this.httpClient.get<Content[]>(this.path + '/?id=' + categoryId);
  }

  getContentsByString(str): Observable<Content[]> {
    return this.httpClient.get<Content[]>(this.path + '/?q=' + str);
  }

  getContentsById(contentId): Observable<Content> {
    return this.httpClient.get<Content>(this.path + '/' + contentId);
  }

  getPhotosByContent(contentId): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.path + '/photo?contentid=' + contentId);
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.path + '/categories');
  }

  loggedIn() {
    return this.token != null;
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigateByUrl('/value');
  }
}
