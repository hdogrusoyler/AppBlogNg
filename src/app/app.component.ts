import { Component } from '@angular/core';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ValueService]
})
export class AppComponent {
  title = 'AppBlogNg';

  constructor(private valueService: ValueService) { }

  get isAuthenticated() {
    return this.valueService.loggedIn();
  }
}
