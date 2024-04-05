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
  categories: string[] = [];
  allCategories: any = [];
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


  saveVideoRequest() {
    this.uploadData.append('video_file', this.videoToUpload, this.videoToUpload.name);
    this.uploadData.append('cover_picture', this.coverToUpload, this.coverToUpload.name);
    this.uploadData.append('title', this.title.value)
    this.uploadData.append('description', this.description.value)
    this.uploadData.append('created_at', '2024-04-05')
    this.uploadData.append('creator', '1')
    this.uploadData.append('category', '1')
    this.API.postVideoToDB(this.uploadData);
    console.log('this.categories', this.categories);
  }


  addCategory(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.categories.push(value);
    }

    event.chipInput!.clear();
    this.categoryCtrl.setValue(null);
  }


  removeCategory(category: string): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);

      this.announcer.announce(`Removed ${category}`);
    }
  }


  selectedCategories(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.viewValue);
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }


  private _filter(value: any): any[] {
    const filterValue = value.name;
    return this.allCategories.filter(category => category.name.includes(filterValue));
  }
}