import { Component, Input, OnInit } from '@angular/core';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedService } from 'src/services/shared.service';
import { APIService } from 'src/services/api.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-video-overview',
  standalone: true,
  imports: [VideoPlayerComponent, MatDialogModule, MatIconModule],
  templateUrl: './video-overview.component.html',
  styleUrl: './video-overview.component.scss'
})
export class VideoOverviewComponent implements OnInit {
  @Input() overviewData: any;
  showContent: boolean = false;
  videoCategory: string = '';
  listExist: boolean = false;

  constructor(public dialog: MatDialog, private shared: SharedService, private API: APIService) {}

  ngOnInit() {
    this.getOverview();
  }


  async getOverview() {
    let respData = this.shared.getVideoOverviewData();

    if (respData === undefined || respData.length === 0) {
      let resp = await this.API.loadVideos();
      this.overviewData = resp[0];
      this.videoCategory = await this.API.getCategory(resp[0].category);
      this.checkMyList(resp[0].id);
      setTimeout(() => { this.showContent = true }, 1000);
    } else {
      this.overviewData = respData[0];
      this.videoCategory = await this.API.getCategory(respData[0].category);
      this.checkMyList(respData[0].id);
      setTimeout(() => { this.showContent = true }, 1000);
    }
  }


  async checkMyList(id: number) {
    let resp = [];
    let idString = id.toString()
    resp.push(await this.API.loadMyList(1));

    let exist = !!resp[0].find((o: { list: string; }) => o.list === idString);
    exist ? this.listExist = true : this.listExist = false;
  }


  playVideo() {
    let playerDialog = this.dialog.open(VideoPlayerComponent);
    playerDialog.componentInstance.videoURL = `http://127.0.0.1:8000/${this.overviewData.video_file}`;
  }
}
