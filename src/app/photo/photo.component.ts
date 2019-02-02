import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
  providers: [PhotoService]
})
export class PhotoComponent implements OnInit {

  constructor(
    private photoService: PhotoService,
    private activatedRoute: ActivatedRoute
    ) { }

    photos: Photo[];

    id: number;
    selectedFile: File;

  ngOnInit() {
    this.get();
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    // this.http is the injected HttpClient
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    this.set(uploadData);
  }

  set(uploadData) {
    this.activatedRoute.params.subscribe(params => {
    this.setPhoto(params['contentId'], uploadData);
    });
  }

  setPhoto(contentId, formData) {
    if (contentId) {
      this.photoService.setPhoto(contentId, formData);
    } else {
      return;
    }
  }

  get() {
    this.activatedRoute.params.subscribe(params => {
      this.getPhotos(params['contentId']);
    });
  }

  getPhotos(id) {
    this.photoService.getPhotos(id).subscribe(data => {
      this.photos = data;
    });
  }

  delete(id) {
    console.log(id);
    this.activatedRoute.params.subscribe(params => {
    this.deletePhoto(params['contentId'], id);
    });
  }

  deletePhoto(contentId, id) {
    console.log(contentId);
    this.photoService.deletePhoto(contentId, id);
  }

}
