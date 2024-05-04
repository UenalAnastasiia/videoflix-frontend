import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedService } from 'src/services/shared.service';
import { APIService } from 'src/services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../UI/snackbar/snackbar.service';
import { LoadingSpinnerComponent } from 'src/UI/loading-spinner/loading-spinner.component';
import { VideoInfoDialogComponent } from '../video-info-dialog/video-info-dialog.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-video-overview',
  standalone: true,
  imports: [VideoPlayerComponent, MatDialogModule, MatIconModule, LoadingSpinnerComponent, NavigationComponent],
  templateUrl: './video-overview.component.html',
  styleUrl: './video-overview.component.scss'
})
export class VideoOverviewComponent implements OnInit, AfterViewInit {
  @Input() overviewData: any;
  @ViewChild('video_description') video_description: ElementRef;
  showContent: boolean = false;
  videoCategory: any = [];
  listExist: boolean = false;
  myList: any = [];
  maxHeight: number = 80;
  isCollapsed: boolean = false;
  isCollapsable: boolean = false;

  constructor(public dialog: MatDialog, private shared: SharedService, private API: APIService, private messageService: SnackbarService, private auth: AuthService) {}

  ngOnInit() {
    this.checkOverview();
  }


  ngAfterViewInit() {
    setTimeout(() => {
      let currentHeight = this.video_description.nativeElement.offsetHeight;

      if (currentHeight > this.maxHeight) {
          this.isCollapsed = true;
          this.isCollapsable = true;
      }
    }, 1100);
}


  checkOverview() {
    let respData = this.shared.getVideoOverviewData();

    if (respData === undefined || respData.length === 0) {
      this.getFirstVideoFromAPI();
    } else {
      this.getVideoOverview(respData);
    }
  }


  async getFirstVideoFromAPI() {
    let resp = await this.API.getAllVideos();
    this.overviewData = resp[0];
    this.loadCategories(resp[0]);
    this.checkMyList(resp[0].id);
    setTimeout(() => { this.showContent = true }, 1000);
  }


  getVideoOverview(respData: Object) {
    this.overviewData = respData[0];
    this.loadCategories(respData[0]);
    this.checkMyList(respData[0].id);
    setTimeout(() => { this.showContent = true }, 1000);
  }


  async loadCategories(data: { category: string; }) {
    let categoryArray = data.category.split(',').map((x: string | number)=>+x);
    for (let index = 0; index < categoryArray.length; index++) {
      let resp = await this.API.getCategoryName(categoryArray[index]);

      if (resp !== undefined) {
        this.videoCategory.push(resp);
      }
    }
  }


  async checkMyList(id: number) {
    let resp = [];
    let idString = id.toString();
    this.myList = await this.API.getMyList(this.auth.loggedUser.user_id);
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
      'creator': this.auth.loggedUser.user_id
    };  

    this.API.postVideoToList(body);
    this.messageService.showSnackMessage('Added to my list!');
    this.listExist = true;
  }


  async removeVideoFromMyList() {
    this.myList = await this.API.getMyList(this.auth.loggedUser.user_id);
    let idString = this.overviewData.id.toString();
    let listID = this.myList.find((o: { list: string; }) => o.list === idString);
    this.API.deleteVideoFromList(listID.id);
    this.messageService.showSnackMessage('Removed from my list!');
    this.listExist = false;
  }


  openVideoInfo() {
    let infoDialog = this.dialog.open(VideoInfoDialogComponent);
    infoDialog.componentInstance.videoData = this.overviewData;
    infoDialog.componentInstance.videoCategory = this.videoCategory
  }

}