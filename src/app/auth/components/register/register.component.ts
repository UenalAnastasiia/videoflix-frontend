import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/UI/snackbar/snackbar.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { SharedService } from 'src/services/shared.service';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from 'src/app/footer-components/footer/footer.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule, MatButtonModule, FooterComponent, MatTooltipModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  formReg: FormGroup;
  error: string;
  passwordTooltip: string = `1. Can not be too similar to your other personal information. 2. Must contain at least 8 characters.
  3. Can not be a commonly used password. 4. Can not be entirely numeric.`;


  constructor(private authService: AuthService, private router: Router, private messageService: SnackbarService, public shared: SharedService) { }

  ngOnInit(): void {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      password_repeat: new FormControl(),
      username: new FormControl(),
      first_name: new FormControl(),
      last_name: new FormControl()
    });
  }


  /**
   * Processes the submission of the registration form.
   * Extracts the values from the form, sets default profile pictures,
   * Sends a registration request to the AuthService and navigates the user to the login page.
   */
  onSubmit() { 
    const formValue = this.formReg.value;
    formValue.image = 'profile.png';
    this.authService.register(formValue).subscribe({
      next: (response) => {
        this.messageService.showSnackMessage('User created! Please confirm your email.');
      },
      error: (error) => {
        this.error = error.error;
      },
      complete: () => {
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 1000);
      }
    })     
  }
}