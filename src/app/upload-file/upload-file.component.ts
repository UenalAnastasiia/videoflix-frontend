import { Component, ElementRef, ViewChild } from '@angular/core';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationComponent } from '../navigation/navigation.component';
import { HttpEventType } from '@angular/common/http';
import { SnackbarService } from 'src/UI/snackbar/snackbar.service';
import { MatRadioModule } from '@angular/material/radio';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule, CommonModule, MatIconModule, MatTooltipModule, 
    NavigationComponent, MatChipsModule, MatAutocompleteModule, MatRadioModule
  ],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent {
  @ViewChild('video_input') video_input: ElementRef;
  @ViewChild('video_input_title') video_input_title: ElementRef;
  @ViewChild('cover_input') cover_input: ElementRef;
  @ViewChild('cover_input_title') cover_input_title: ElementRef;
  title = new FormControl('', [Validators.required, Validators.minLength(1)]);
  description = new FormControl('', [Validators.required, Validators.minLength(1)]);
  displayVideo: FormControl = new FormControl('', Validators.required);
  displayCover: FormControl = new FormControl('', Validators.required);
  releaseYear = new FormControl('2024', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$")]);
  videoToUpload: File | null = null;
  coverToUpload: File | null = null;
  uploadData: FormData = new FormData();
  uploadProgress = 0;
  categoryCtrl = new FormControl('');
  categories: any[] = [{id: 1, name: 'New'}];
  allCategories: any = [];
  categoriesID: any = [1];
  showAddInput: boolean = false;
  updateCategory: boolean = false;
  ageOptions: string[] = ['+6', '+12', '+16', '+18'];
  choosenAge: string = '+6';

  constructor(public auth: AuthService, private API: APIService, private messageService: SnackbarService, public shared: SharedService) { }

  async ngOnInit() {
    this.allCategories = await this.API.getAllCategories();
  }


  /**
   * Processes the event of a video upload.
   * @param event - The event object that contains information about the uploaded video.
   */
  handleVideoUploadEvent(event: any) {
    if (event.target.files[0]) {
      if (event.target.files[0].size/1024/1024 > 10) {
        this.messageService.showSnackMessage('File is bigger than 10MB!');
      } else {
        this.videoToUpload = event.target.files[0];
        this.displayVideo.patchValue(`${this.videoToUpload.name}`);
      }
    }
  }


  /**
   * Processes the event of a cover image upload.
   * @param event - The event object that contains information about the uploaded cover image.
   */
  handleCoverUploadEvent(event: any) {
    if (event.target.files[0]) {
      if (event.target.files[0].size/1024/1024 > 5) {
        this.messageService.showSnackMessage('File is bigger than 5MB!');
      } else {
        this.coverToUpload = event.target.files[0];
        this.displayCover.patchValue(`${this.coverToUpload.name}`);
      }
    }
  }


  /**
   * Saves a video request by executing several steps in succession.
   */
  saveVideoRequest() {
    this.getCategoriesID();
    setTimeout(() => {
          this.appendUploadData();
          this.postVideoToDB();  
          this.API.patchCategory(this.categoriesID);
          this.cleanForm();      
    }, 1000);
  }


  /**
   * Updates the list of category IDs by iterating through the categories and adding missing IDs.
   */
  getCategoriesID() {
    for (let index = 0; index < this.categories.length; index++) {

      if (this.categoriesID.includes(this.categories[index].id) === false) {
        this.categoriesID.push(this.categories[index].id);
      }
    }
  }


  /**
   * Adds the required upload data to a FormData object.
   */
  appendUploadData() {
    this.uploadData.append('video_file', this.videoToUpload, this.videoToUpload.name);
    this.uploadData.append('cover_picture', this.coverToUpload, this.coverToUpload.name);
    this.uploadData.append('title', this.title.value)
    this.uploadData.append('description', this.description.value)
    this.uploadData.append('created_at', this.dateFormat())
    this.uploadData.append('creator', this.auth.loggedUser.user_id)
    this.uploadData.append('category', this.categoriesID)
    this.uploadData.append('age', this.choosenAge)
    this.uploadData.append('release_year', this.releaseYear.value)
  }


  /**
   * Sends the video to the database and tracks the upload progress.
   */
  postVideoToDB() {
    this.messageService.showSnackMessage('Start Upload...');
    this.API.postVideoToDB(this.uploadData).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } 
      },
      error: (err: any) => {
        if (err.error && err.error.message) { alert(err.error.message); } 
        else { this.messageService.showSnackMessage('Could not upload the file!'); }
        this.uploadProgress = 0;
      },
      complete: () => {
        this.messageService.showSnackMessage('Upload completed!');
      }
    });
  }


  dateFormat() {
    const today = new Date();
    let currdateFormat = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    return currdateFormat;
  }


  /**
   * Adds a new category if the category name does not already exist.
   * Updates the category data after adding.
   */
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
        this.messageService.showSnackMessage('Category exist');
      }
    }

    this.categoryCtrl.setValue(null);
  }

  
  /**
   * Updates the category data by retrieving all categories from the API.
   * Resets the update status and other relevant variables.
   */
  async updateCategoryData() {
    this.allCategories = await this.API.getAllCategories();
    this.updateCategory = false;
    this.categoriesID = [1];
    this.categories = [{id: 1, name: 'New'}];
    this.showAddInput = false;
  }


  /**
   * Sends a request to save a new category with the specified name.
   * @param categoryName The name of the category to be added.
   */
  saveCategoryRequest(categoryName: string) {
    let body = {
      'name': categoryName,
      'creator': this.auth.loggedUser.user_id
    };

    this.API.postCategoryToDB(body);
  }


  /**
   * Adds a selected category to the list or removes it if it is already included.
   * Resets the input field for the category selection.
   * @param input The selected category to be added or removed.
   */
  selectedCategories(input) {
    if(!this.categories.includes(input)) {
      this.categories.push(input);
    } else {
      this.categories.splice(this.categories.indexOf(input), 1);
    }

    this.categoryCtrl.setValue(null);
  }


  /**
   * Resets all input fields of the form and the form controls to their initial values.
   */
  cleanForm() {
    this.video_input.nativeElement.value = null;
    this.video_input_title.nativeElement.value = null;
    this.cover_input.nativeElement.value = null;
    this.cover_input_title.nativeElement.value = null;
    this.title.reset();
    this.description.reset();
    this.categoriesID= [1];
    this.categoryCtrl.setValue('');
  }
}