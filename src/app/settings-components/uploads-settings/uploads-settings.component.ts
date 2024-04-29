import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { APIService } from 'src/services/api.service';

@Component({
  selector: 'app-uploads-settings',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './uploads-settings.component.html',
  styleUrl: './uploads-settings.component.scss'
})
export class UploadsSettingsComponent implements OnInit {
  showContent: boolean = false;
  uploadData: any;
  deletedObjects: number[] = [];
  allVideos: any = [];
  checkCategories: any;

  constructor(private API: APIService) { }


  async ngOnInit() {
    this.uploadData = await this.API.getUserUploads(1);
    this.allVideos = await this.API.getAllVideos();

    setTimeout(() => {
      this.showContent = true;
    }, 500);
  }


  deleteVideoFromDB(data) {
    this.API.deleteVideoFromDB(data.id);
    this.deletedObjects.push(data.id);
    this.checkCategoryContent(data.category, data.id);
  }


  checkValues(id: number) {
    return this.deletedObjects.includes(id);
  }


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


  videoWithMultiCategory(category, joinedCategoryString) {
    this.checkCategories = category.split(',');

    for (let index = 0; index < this.checkCategories.length; index++) {
      let contentExist = joinedCategoryString.includes(this.checkCategories[index]);

      if (contentExist === false) {
        this.API.patchCategoryContent(this.checkCategories[index].replace(/\s+/g,''));
      }
    }
  }


  videoWithOneCategory(category, joinedCategoryString) {
    this.checkCategories = category;
    let contentExist = joinedCategoryString.includes(this.checkCategories);

    if (contentExist === false) {
      this.API.patchCategoryContent(this.checkCategories);
    }
  }

}