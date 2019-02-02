import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../models/category';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    ) { }

  categories: Category[];
  categoryAddForm: FormGroup;
  category: Category;

  ngOnInit() {
    this.createCategoryForm();
    this.getCategories();
  }

  createCategoryForm() {
    this.categoryAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onCreate() {
    if (this.categoryAddForm.valid) {
      const category = Object.assign({}, this.categoryAddForm.value);
      this.set(category);
    }
  }

  set(category) {
    this.categoryService.setCategory(category);
  }

  getCategory(category) {
    this.category = category;
  }

  onUpdate() {
      this.update(this.category);
  }

  update(category) {
    this.categoryService.updateCategory(category);
  }

  onDelete(id) {
    this.categoryService.deleteCategory(id);
    console.log(id);
  }

  onClose() {
    this.categoryService.getNavigateCategory();
  }

}
