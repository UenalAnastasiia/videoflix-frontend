import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { APIService } from 'src/services/api.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule, CommonModule, MatIconModule, 
    MatChipsModule, MatAutocompleteModule
  ],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent {
  title = new FormControl('', [Validators.required, Validators.minLength(1)]);
  description = new FormControl('', [Validators.required, Validators.minLength(1)]);
  displayVideo: FormControl = new FormControl('', Validators.required);
  displayCover: FormControl = new FormControl('', Validators.required);
  videoToUpload: File | null = null;
  coverToUpload: File | null = null;
  uploadData: FormData = new FormData();

  categoryCtrl = new FormControl('');
  categories: any[] = [{id: 24, name: 'New'}];
  allCategories: any = [];
  categoriesID: any = [24];
  showAddInput: boolean = false;
  updateCategory: boolean = false;

  constructor( public auth: AuthService, private API: APIService) { }


  async ngOnInit() {
    this.allCategories = await this.API.getAllCategories();
  }


  handleVideoUploadInput(event: any) {
    if (event.target.files[0]) {
      this.videoToUpload = event.target.files[0];
      this.displayVideo.patchValue(`${this.videoToUpload.name}`);
    }
  }


  handleCoverUploadInput(event: any) {
    if (event.target.files[0]) {
      this.coverToUpload = event.target.files[0];
      this.displayCover.patchValue(`${this.coverToUpload.name}`);
    }
  }


  saveVideoRequest() {
    this.getCategoriesID();
    
    setTimeout(() => {
          this.uploadData.append('video_file', this.videoToUpload, this.videoToUpload.name);
          this.uploadData.append('cover_picture', this.coverToUpload, this.coverToUpload.name);
          this.uploadData.append('title', this.title.value)
          this.uploadData.append('description', this.description.value)
          this.uploadData.append('created_at', this.dateFormat())
          this.uploadData.append('creator', '1')
          this.uploadData.append('category', this.categoriesID)
          this.API.postVideoToDB(this.uploadData);          
    }, 1000);
  }


  getCategoriesID() {
    for (let index = 0; index < this.categories.length; index++) {

      if (this.categoriesID.includes(this.categories[index].id) === false) {
        this.categoriesID.push(this.categories[index].id);
      }
    }
  }


  dateFormat() {
    const today = new Date();
    let currdateFormat = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    return currdateFormat;
  }


  addCategory() {
    if (this.categoryCtrl.value) {
      let nameExist = this.allCategories.some((el: { name: any; }) => { return el.name === this.categoryCtrl.value});
      if (nameExist === false) {
        this.saveCategoryRequest(this.categoryCtrl.value);
        this.updateCategory = true;
        setTimeout(() => {
          this.updateCategoryData();
        }, 500);
      } else {
        alert('Category exist')
      }
    }

    this.categoryCtrl.setValue(null);
  }


  async updateCategoryData() {
    this.allCategories = await this.API.getAllCategories();
    this.updateCategory = false;
    this.categoriesID = [24];
    this.categories = [{id: 24, name: 'New'}];
    this.showAddInput = false;
  }


  saveCategoryRequest(categoryName: string) {
    let body = {
      'name': categoryName
    };

    this.API.postCategoryToDB(body);
  }


  selectedCategories(input) {
    if(!this.categories.includes(input)) {
      this.categories.push(input);
    } else {
      this.categories.splice(this.categories.indexOf(input), 1);
    }

    this.categoryCtrl.setValue(null);
  }
}