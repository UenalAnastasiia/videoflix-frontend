import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { APIService } from 'src/services/api.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule, CommonModule, MatIconModule],
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

  constructor( public auth: AuthService, private API: APIService) { }


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
  }
}
