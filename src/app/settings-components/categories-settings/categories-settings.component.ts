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
import { SharedService } from 'src/services/shared.service';

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
  

  constructor(private API: APIService, private messageService: SnackbarService, private auth: AuthService, public shared: SharedService) { }


  async ngOnInit() {
    this.categoryData = await this.API.getUserCategories(this.auth.loggedUser.user_id);

    setTimeout(() => {
      this.showContent = true;
    }, 500);
  }

  
  /**
   * Deletes a category from the database.
   *
   * This function sends a request to the API to delete the category with the
   * specified ID from the database. The ID of the
   * deleted category is added to a list of deleted objects
   * and a confirmation message is displayed.
   *
   * @param {number} id - The ID of the category to be deleted.
   */
  deleteCategoryFromDB(id: number) {
    this.API.deleteCategoryFromDB(id);
    this.deletedObjects.push(id);
    this.messageService.showSnackMessage('Deleted!');
  }


  /**
   * Checks whether an ID is contained in the list of deleted objects.
   *
   * This function checks whether the specified ID exists in the list of deleted objects
   * (`deletedObjects`) and returns a Boolean value.
   *
   * @param {number} id - The ID to be checked.
   * @return {boolean} - Returns true if the ID is contained in the list of deleted objects, otherwise false.
   */
  checkValues(id: number): boolean {
    return this.deletedObjects.includes(id);
  }
}