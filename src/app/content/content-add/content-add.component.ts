import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Content } from 'src/app/models/content';
import { Photo } from 'src/app/models/photo';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-content-add',
  templateUrl: './content-add.component.html',
  styleUrls: ['./content-add.component.css'],
  providers: [ContentService]
})
export class ContentAddComponent implements OnInit {

  constructor(
    private contentService: ContentService,
    private formBuilder: FormBuilder,
  ) { }

  contentAddForm: FormGroup;
  selectedFile: File;
  categories: Category[];

  ngOnInit() {
    this.createContentForm();
    this.getCategories();
  }

  createContentForm() {
    this.contentAddForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.contentAddForm.valid) {
      const content = Object.assign({}, this.contentAddForm.value);

      const uploadData = new FormData();
      uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

      this.set(content, uploadData);
    }
  }

  set(content, image) {
    this.contentService.setContent(content, image);
  }

  getCategories() {
    this.contentService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

}
