import { Component, OnInit } from '@angular/core';
import { ValueService } from 'src/app/services/value.service';
import { ActivatedRoute } from '@angular/router';
import { Content } from 'src/app/models/content';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-value-detail',
  templateUrl: './value-detail.component.html',
  styleUrls: ['./value-detail.component.css'],
  providers: [ValueService]
})
export class ValueDetailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private valueService: ValueService
  ) { }

  content: Content;
  photos: Photo[] = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
    this.getContentById(params['valueId']);
    });
  }

  getContentById(contentId) {
    this.valueService.getContentsById(contentId).subscribe(data => {
      this.content = data;
      this.getPhotosByContent(contentId);
    });
  }
  getPhotosByContent(contentId) {
    this.valueService.getPhotosByContent(contentId).subscribe(data => {
      this.photos = data;
    });
  }

}
