import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationComponent } from 'src/app/navigation/navigation.component';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NavigationComponent, MatButtonModule, MatIconModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  userSettings: boolean = true;
  uploadSettings: boolean = false;
  categoriesSettings: boolean = false;

}
