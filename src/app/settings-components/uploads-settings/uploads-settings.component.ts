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

  constructor(private API: APIService) { }


  async ngOnInit() {
    this.uploadData = await this.API.getUserUploads(1);

    setTimeout(() => {
      this.showContent = true;
    }, 500);
  }


  deleteVideoFromDB(id: number) {
    this.API.deleteVideoFromDB(id);
    this.deletedObjects.push(id);
  }


  checkValues(id: number) {
    return this.deletedObjects.includes(id);
  }

}