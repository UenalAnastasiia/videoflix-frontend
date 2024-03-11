import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth/components/services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent {
  title = '';
  description = '';
  videoFile = '';
  creator = null;
  file = '';

  constructor( public auth: AuthService, private http: HttpClient) {
  }


  uploadFile() {
    this.videoFile = this.file;  
  }

  async saveVideo() {
    // const authToken: any = JSON.parse(localStorage.getItem('user') || '"');
    // this.auth.getLoggedUser();
    // this.auth.userName === undefined ? this.creator = null : this.creator = authToken['id'];
    let body = {
      'title': this.title, 
      'description': this.description, 
      'videoFile': this.videoFile, 
      'created_at': '2024-03-11',
      'creator': 1,
    };   

    const url = environment.baseURL + '/videos/';
    this.http.post(url, body);
    console.log('Done: ', body);
  }
}
