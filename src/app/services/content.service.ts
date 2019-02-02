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
export class ContentService {

constructor(
  private httpClient: HttpClient,
  private router: Router
  ) { }

  path = 'https://localhost:44349/api/contents';

  TOKEN_KEY = 'token';

  setContent(content, formData) {
    this.httpClient.post(this.path + '/add', content).subscribe(data => {
    this.setPhoto(data['id'], formData);
    });
  }

  setPhoto(id, formData) {
    this.httpClient.post(this.path + '/' + id + '/photos', formData)
    .subscribe(x => this.getNavigateContent(id));
  }

  setEditContent(formData) {
    this.httpClient.post(this.path + '/update', formData)
    .subscribe(data => this.getNavigateContent(data['id']));
  }

  getNavigateContent(id) {
    this.router.navigateByUrl('content/' + id);
  }

  deleteContent(id) {
    this.httpClient.post(this.path + '/delete?id=' + id, null).subscribe(x => this.router.navigateByUrl('content'));
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigateByUrl('/value');
  }

  loggedIn() {
    return this.token != null;
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }



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
    return this.httpClient.get<Category[]>('https://localhost:44349/api' + '/categories');
  }

}
