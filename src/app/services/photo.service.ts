import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Content } from '../models/content';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

constructor(
  private httpClient: HttpClient,
  private router: Router
  ) { }

  TOKEN_KEY = 'token';

  path = 'https://localhost:44349/api/contents';

  setPhoto(id, formData) {
    this.httpClient.post(this.path + '/' + id + '/photos', formData).subscribe(x => this.getNavigateContent(id));
  }

  getPhotos(id): Observable<Photo[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.get<Photo[]>(this.path + '/' + id + '/photos/content', {headers: headers});
  }

  deletePhoto(contentId, id) {
    // tslint:disable-next-line:max-line-length
    this.httpClient.post(this.path + '/' + contentId + '/photos/delete?id=' + id, null).subscribe(x => this.getNavigateContent(contentId));
  }

  getNavigateContent(id) {
    this.router.navigateByUrl('blank').then(() => this.router.navigateByUrl('/contentedit/' + id));
  }

}
