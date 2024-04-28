import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { UploadsSettingsComponent } from '../uploads-settings/uploads-settings.component';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import { CategoriesSettingsComponent } from '../categories-settings/categories-settings.component';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NavigationComponent, MatButtonModule, MatIconModule, UploadsSettingsComponent, UserSettingsComponent, CategoriesSettingsComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  userSettings: boolean = true;
  uploadSettings: boolean = false;
  categoriesSettings: boolean = false;


}
