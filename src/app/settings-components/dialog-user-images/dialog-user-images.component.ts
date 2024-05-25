import { Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { APIService } from 'src/services/api.service';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from 'src/UI/snackbar/snackbar.service';

@Component({
  selector: 'app-dialog-user-images',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatIconModule, MatRadioModule, CommonModule,FormsModule],
  templateUrl: './dialog-user-images.component.html',
  styleUrl: './dialog-user-images.component.scss'
})
export class DialogUserImagesComponent {
  userData: any;
  images: string[] = ['profile.png', 'profile_1.png',  'profile_2.png', 'profile_3.png', 'profile_4.png', 'profile_5.png', 'profile_6.png',]
  profileImg: string;

  constructor(private API: APIService, private messageService: SnackbarService, public dialogRef: MatDialogRef<DialogUserImagesComponent>) {}


  saveUserImg() {
    const body = {
      "image": this.profileImg,
    };

    this.API.patchUser(this.userData.id, body);
    this.dialogRef.close();
    this.messageService.showSnackMessage('Saved! Profile will be changed soon.');
  }
}
