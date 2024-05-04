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
import { FooterComponent } from 'src/app/footer/footer.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule, MatButtonModule, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  formReg: FormGroup;
  error: string;


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


  onSubmit() { 
    this.authService.register(this.formReg.value).subscribe({
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
