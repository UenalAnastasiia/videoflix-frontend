import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { APIService } from 'src/services/api.service';

@Component({
  selector: 'app-uploads-settings',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './uploads-settings.component.html',
  styleUrl: './uploads-settings.component.scss'
})
export class UploadsSettingsComponent implements OnInit {
  showContent: boolean = false;
  uploadData: any;
  deletedObjects: number[] = [];

  constructor(public API: APIService) { }


  async ngOnInit() {
    this.uploadData = await this.API.getUserUploads(1);

    setTimeout(() => {
      this.showContent = true;
    }, 500);
  }


  async deleteVideoFromDB(id: number) {
    this.API.deleteVideoFromDB(id);
    this.deletedObjects.push(id);
  }


  checkValues(id: number) {
    return this.deletedObjects.includes(id);
  }

}