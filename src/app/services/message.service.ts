import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Message } from '../models/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  path = 'https://localhost:44349/api/messages';

  TOKEN_KEY = 'token';

  getMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.path + '/');
  }

  setMessage(content) {
    this.httpClient.post(this.path + '/add', content).subscribe(data => {
      this.router.navigateByUrl('blank', {skipLocationChange: true}).then(() => this.router.navigateByUrl('/iletisim'));
    });
  }

  setEditMessage(formData) {
    this.httpClient.post(this.path + '/update', formData)
    .subscribe(data => this.getNavigate(data['id']));
  }

  getNavigate(id) {
    this.router.navigateByUrl('message/' + id);
  }

  deleteMessage(id) {
    this.httpClient.post(this.path + '/delete?id=' + id, null).subscribe(x =>
      this.getNavigateMessage());
  }

  getNavigateMessage() {
    this.router.navigateByUrl('blank', {skipLocationChange: true}).then(() => this.router.navigateByUrl('/messageget'));
  }

}
