import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { Content } from 'src/app/models/content';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-content-edit',
  templateUrl: './content-edit.component.html',
  styleUrls: ['./content-edit.component.css'],
  providers: [ContentService]
})
export class ContentEditComponent implements OnInit {

  constructor(
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
    ) { }

    content: Content;
    contentEditForm: FormGroup;
    categories: Category[];

  ngOnInit() {
    this.createContentForm();
    this.getCategories();
    this.get();
  }

  createContentForm() {
    this.contentEditForm = this.formBuilder.group({
      id: [{value: '', disabled: true}, Validators.required],
      title: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getCategories() {
    this.contentService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  get() {
    this.activatedRoute.params.subscribe(params => {
      this.getContentById(params['contentId']);
    });
    }

  getContentById(contentId) {
    this.contentService.getContentsById(contentId).subscribe(data => {
    this.content = data;
    this.getValid();
    });
    }

    getValid() {
      this.contentEditForm.get('id').setValue(this.content.id);
      this.contentEditForm.get('title').setValue(this.content.title);
      this.contentEditForm.get('categoryId').setValue(this.content.categoryId);
      this.contentEditForm.get('description').setValue(this.content.description);
    }

  onEdit() {
    if (this.contentEditForm.valid) {
      this.content.title = this.contentEditForm.value.title;
      this.content.categoryId = this.contentEditForm.value.categoryId;
      this.content.description = this.contentEditForm.value.description;
      this.set(this.content);
    }
  }

  set(content) {
    this.contentService.setEditContent(content);
  }

  onDelete(id) {
    this.contentService.deleteContent(id);
  }
}
