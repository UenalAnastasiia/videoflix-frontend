import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoadingSpinnerComponent } from 'src/UI/loading-spinner/loading-spinner.component';
import { SnackbarService } from 'src/UI/snackbar/snackbar.service';
import { APIService } from 'src/services/api.service';
import { SharedService } from 'src/services/shared.service';
import { SettingsComponent } from '../settings/settings.component';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-uploads-settings',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, LoadingSpinnerComponent, MatTooltipModule, SettingsComponent, NavigationComponent],
  templateUrl: './uploads-settings.component.html',
  styleUrl: './uploads-settings.component.scss'
})
export class UploadsSettingsComponent implements OnInit {
  showContent: boolean = false;
  uploadData: any;
  deletedObjects: number[] = [];
  allVideos: any = [];
  checkCategories: any;

  constructor(private API: APIService, public shared: SharedService, private messageService: SnackbarService, private auth: AuthService) { }


  /**
   * Initializes the component by retrieving the user's upload data and all available videos from the server.
   * The display is activated after a short delay to ensure that the data has been loaded.
   */
  async ngOnInit() {
    this.uploadData = await this.API.getUserUploads(this.auth.loggedUser.user_id);
    this.allVideos = await this.API.getAllVideos();
    
    setTimeout(() => {
      this.showContent = true;
    }, 500);
  }

 
  /**
   * Deletes a video from the database and updates the corresponding data and displays.
   * @param data The data of the video to be deleted.
   */
  deleteVideoFromDB(data) {
    this.API.deleteVideoFromDB(data.id);
    this.deletedObjects.push(data.id);
    this.messageService.showSnackMessage('Deleted!');
    this.checkCategoryContent(data.category, data.id);
  }


  checkValues(id: number) {
    return this.deletedObjects.includes(id);
  }


  /**
   * Checks the content of a category and updates the display accordingly.
   * @param category The category of the deleted video.
   * @param id The ID of the deleted video.
   */
  checkCategoryContent(category: any, id: number) {
    let allVideoCategories = [];
    let filteredVideos = this.allVideos.filter(( obj ) => { return obj.id !== id });

    for (let index = 0; index < filteredVideos.length; index++) {
      allVideoCategories.push(this.allVideos[index].category);
    }

    let joinedCategoryString = allVideoCategories.map(e => e.replace(/\s/g, "")).join(",");

    if (category.includes(',')) {
      this.videoWithMultiCategory(category, joinedCategoryString);
    } else {
      this.videoWithOneCategory(category, joinedCategoryString);
    }
  }


  /**
   * Updates the display for videos with multiple categories.
   * @param category The category of the deleted video.
   * @param joinedCategoryString The string containing all categories of the remaining videos.
   */
  videoWithMultiCategory(category, joinedCategoryString) {
    this.checkCategories = category.split(',');

    for (let index = 0; index < this.checkCategories.length; index++) {
      let contentExist = joinedCategoryString.includes(this.checkCategories[index]);

      if (contentExist === false) {
        this.API.patchCategoryContent(this.checkCategories[index].replace(/\s+/g,''));
      }
    }
  }


  /**
   * Updates the display for videos with a single category.
   * @param category The category of the deleted video.
   * @param joinedCategoryString A string containing all categories of the remaining videos.
   */
  videoWithOneCategory(category, joinedCategoryString) {
    this.checkCategories = category;
    let contentExist = joinedCategoryString.includes(this.checkCategories);

    if (contentExist === false) {
      this.API.patchCategoryContent(this.checkCategories);
    }
  }

}