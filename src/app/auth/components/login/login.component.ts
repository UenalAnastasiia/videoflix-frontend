import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { SharedService } from 'src/services/shared.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EmailDialogComponent } from '../email-dialog/email-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatIconModule, MatCardModule, MatMenuModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  uidb64: string;
  token: string;
  newPassword: string;
  error: string;


  constructor(private authService: AuthService, public shared: SharedService, public dialog: MatDialog) { }


  async login() {
    try {
      let resp: any = await this.authService.loginWithUsernameAndPassword(this.username, this.password);
      this.authService.loggedUser = resp;
      this.shared.navigateTo('/videoflix');
    } catch(e) {
      this.error = 'Have you confirmed your email? Please check your username and password!';
      console.error('Error in fetch token: ', e);    
    }
  }


  guestLogin() {
   
  }


  openEmailDialog() {
    this.dialog.open(EmailDialogComponent);
  }
}
