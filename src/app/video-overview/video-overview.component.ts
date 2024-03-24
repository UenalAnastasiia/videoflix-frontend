import { Component, Input, OnInit } from '@angular/core';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedService } from 'src/services/shared.service';
import { APIService } from 'src/services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../UI/snackbar/snackbar.service';

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
  myList: any = [];

  constructor(public dialog: MatDialog, private shared: SharedService, private API: APIService, private messageService: SnackbarService) {}

  ngOnInit() {
    this.getOverview();
  }


  async getOverview() {
    let respData = this.shared.getVideoOverviewData();

    if (respData === undefined || respData.length === 0) {
      let resp = await this.API.getAllVideos();
      this.overviewData = resp[0];
      this.videoCategory = await this.API.getCategoryName(resp[0].category);
      this.checkMyList(resp[0].id);
      setTimeout(() => { this.showContent = true }, 1000);
    } else {
      this.overviewData = respData[0];
      this.videoCategory = await this.API.getCategoryName(respData[0].category);
      this.checkMyList(respData[0].id);
      setTimeout(() => { this.showContent = true }, 1000);
    }
  }


  async checkMyList(id: number) {
    let resp = [];
    let idString = id.toString();
    this.myList = await this.API.getMyList(1);
    resp.push(this.myList);

    let exist = this.shared.findItemInArray(resp, idString);
    exist ? this.listExist = true : this.listExist = false;
  }


  playVideo() {
    let playerDialog = this.dialog.open(VideoPlayerComponent);
    playerDialog.componentInstance.videoURL = `http://127.0.0.1:8000${this.overviewData.video_file}`;
  }


  addVideoToMyList() {
    let body = {
      'list': this.overviewData.id, 
      'creator': 1
    };  

    this.API.postVideoToList(body);
    this.messageService.showSnackMessage('Added!');
    this.listExist = true;
  }


  async removeVideoFromMyList() {
    this.myList = await this.API.getMyList(1);
    let idString = this.overviewData.id.toString();
    let listID = this.myList.find((o: { list: string; }) => o.list === idString);
    this.API.deleteVideoFromList(listID.id);
    this.messageService.showSnackMessage('Removed!');
    this.listExist = false;
  }
}
