import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SnackbarService } from 'src/UI/snackbar/snackbar.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
  newPassword: string;
  error: string;
  showError: boolean = false;

  constructor(private authService: AuthService, private route: ActivatedRoute, public messageService: SnackbarService, public shared: SharedService) { }


  sendRequestResetPassword(): void {
    let token = this.route.snapshot.paramMap.get('token').split('=')[1];  

    this.authService.resetPasswordInDB(token, this.newPassword).subscribe({
      next: (response) => {
        this.messageService.showSnackMessage('Password reset successful! You can now log in.');
        this.shared.navigateTo('/login');
        console.log('Completed!');
      },
      error: (err) => {
          this.error = err.error;
      }
    });  
  }
}
