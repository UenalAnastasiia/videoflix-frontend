import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoadingSpinnerComponent } from 'src/UI/loading-spinner/loading-spinner.component';
import { SnackbarService } from 'src/UI/snackbar/snackbar.service';
import { APIService } from 'src/services/api.service';
import { SettingsComponent } from '../settings/settings.component';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-categories-settings',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, LoadingSpinnerComponent, MatTooltipModule, SettingsComponent, NavigationComponent],
  templateUrl: './categories-settings.component.html',
  styleUrl: './categories-settings.component.scss'
})
export class CategoriesSettingsComponent implements OnInit {
  categoryData: any;
  showContent: boolean = false;
  deletedObjects: number[] = [];
  

  constructor(private API: APIService, private messageService: SnackbarService, private auth: AuthService) { }


  async ngOnInit() {
    this.categoryData = await this.API.getUserCategories(this.auth.loggedUser.user_id);

    setTimeout(() => {
      this.showContent = true;
    }, 500);
  }


  deleteCategoryFromDB(id: number) {
    this.API.deleteCategoryFromDB(id);
    this.deletedObjects.push(id);
    this.messageService.showSnackMessage('Deleted!');
  }


  checkValues(id: number) {
    return this.deletedObjects.includes(id);
  }

}
