import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { SnackbarService } from 'src/UI/snackbar/snackbar.service';

@Component({
  selector: 'app-email-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatIconModule, MatFormFieldModule, 
    MatInputModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './email-dialog.component.html',
  styleUrl: './email-dialog.component.scss'
})
export class EmailDialogComponent {
  email: string = '';
  emptyField: boolean = false;
  sendEmail: boolean = false;

  constructor(private authService: AuthService, private messageService: SnackbarService) { }

  
  /**
   * Sends an e-mail to reset the password if the e-mail field is not empty.
   * Displays corresponding messages and sets status variables.
   */
  sendMailForPasswordReset() {
    if (this.email === "") {
      this.emptyField = true;
    } else {
      const body = {
        "email": this.email
      };

      this.authService.sendMailForPasswordReset(body);
      this.emptyField = false;
      this.sendEmail = true;
      this.messageService.showSnackMessage('E-mail has been sent!');
    }
  }
}