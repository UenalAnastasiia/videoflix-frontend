import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoadingSpinnerComponent } from 'src/UI/loading-spinner/loading-spinner.component';
import { SnackbarService } from 'src/UI/snackbar/snackbar.service';
import { APIService } from 'src/services/api.service';
import { SettingsComponent } from '../settings/settings.component';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule, LoadingSpinnerComponent, 
    SettingsComponent, NavigationComponent],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss'
})
export class UserSettingsComponent implements OnInit {
  showContent: boolean = false;
  userData: any;


  constructor(private API: APIService, private messageService: SnackbarService, private auth: AuthService) { }


  async ngOnInit() {
    let resp = await this.API.getUser(this.auth.loggedUser.user_id);
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
    this.messageService.showSnackMessage('Changes saved!');
  }
}
