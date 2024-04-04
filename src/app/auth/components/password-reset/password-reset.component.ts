import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
  newPassword: string;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }


  sendRequestResetPassword(): void {
    let token = this.route.snapshot.paramMap.get('token').split('=')[1];  
    this.authService.resetPasswordInDB(token, this.newPassword)
      .subscribe({
          next(response) { console.log('Password reset successful:', response); },
          error(err)  { console.error('Password reset error:', err); },
          complete()  { console.log('Observable emitted the complete notification'); }
      });  
  }
}
