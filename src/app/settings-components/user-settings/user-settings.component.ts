import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoadingSpinnerComponent } from 'src/UI/loading-spinner/loading-spinner.component';
import { APIService } from 'src/services/api.service';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule, LoadingSpinnerComponent],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss'
})
export class UserSettingsComponent implements OnInit {
  showContent: boolean = false;
  userData: any;


  constructor(private API: APIService) { }


  async ngOnInit() {
    let resp = await this.API.getUser(1);
    this.userData = resp[0];
    setTimeout(() => {
      this.showContent = true;
    }, 500);
  }


  saveUser() {
    const body = {
      "first_name": this.userData.first_name,
      "last_name": this.userData.last_name,
      "email": this.userData.email,
      "phone": this.userData.phone,
      "street": this.userData.street,
      "city": this.userData.city
    };

    this.API.patchUser(1, body);
  }
}
