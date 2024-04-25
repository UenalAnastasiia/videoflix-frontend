import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule],
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

  constructor(private authService: AuthService, private router: Router) { }

  async login() {
    try {
      let resp: any = await this.authService.loginWithUsernameAndPassword(this.username, this.password);
      this.authService.loggedUser = resp;
      this.router.navigateByUrl('/videoflix');
    } catch(e) {
      alert('Error in Login. Wrong username or Password.')
      console.error('Error in fetch token: ', e);    
    }
  }


  sendMailForPasswordReset() {
    const body = {
      "email": this.email
    };
    this.authService.sendMailForPasswordReset(body);
  }
}
