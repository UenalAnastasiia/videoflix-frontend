import { Component, OnInit } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { APIService } from 'src/services/api.service';

@Component({
  selector: 'app-video-info-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatIconModule],
  templateUrl: './video-info-dialog.component.html',
  styleUrl: './video-info-dialog.component.scss'
})
export class VideoInfoDialogComponent implements OnInit {
  showContent: boolean = false;
  videoData: any;
  videoCategory: string[];
  creator: any;


  constructor(private API: APIService) {}


  async ngOnInit() {
    let creator = await this.API.getUser(this.videoData.creator);
    this.creator = creator[0];

    setTimeout(() => {
      this.showContent = true;
    }, 500);
  }
}
