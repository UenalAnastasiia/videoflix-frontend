import { Component,ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { APIService } from 'src/services/api.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule, CommonModule, MatIconModule, 
    MatChipsModule, MatAutocompleteModule, AsyncPipe
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

  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl('');
  filteredCategories: Observable<any[]>;
  categories: any[] = [{name: 'New'}];
  allCategories: any = [];
  categoriesID: any = [24];
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  announcer = inject(LiveAnnouncer);


  constructor( public auth: AuthService, private API: APIService) { }


  async ngOnInit() {
    this.allCategories = await this.API.getAllCategories();

    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) => (category ? this._filter(category) : this.allCategories.slice())),
    );
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


  async saveVideoRequest() {
    this.checkCategories();
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


  async checkCategories() {
    for (let index = 0; index < this.categories.length; index++) {
      let nameExist = this.allCategories.some((el: { name: any; }) => { return el.name === this.categories[index].name});
      if (nameExist === false) {
        this.saveCategoryRequest(this.categories[index].name);
      } else if (this.categoriesID.includes(this.categories[index].id) === false) {
        this.categoriesID.push(this.categories[index].id);
      }
    }
  }


  async saveCategoryRequest(categoryName: string) {
    let body = {
      'name': categoryName
    };

    let resp: any = await this.API.postCategoryToDB(body);
    
    setTimeout(() => {
      this.categoriesID.push(resp.id);
    }, 500);
  }


  dateFormat() {
    const today = new Date();
    let currdateFormat = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    return currdateFormat;
  }


  addCategory(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.categories.push({name: value});
    }

    event.chipInput!.clear();
    this.categoryCtrl.setValue(null);
  }


  removeCategory(category: any): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
      this.announcer.announce(`Removed ${category}`);
    }
  }


  selectedCategories(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.value);
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }


  private _filter(value: any): any[] {
    const filterValue = value.name;
    return this.allCategories.filter((category: { name: string | any[]; }) => category.name.includes(filterValue));
  }
}