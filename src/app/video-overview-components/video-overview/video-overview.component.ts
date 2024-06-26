import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedService } from 'src/services/shared.service';
import { APIService } from 'src/services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { LoadingSpinnerComponent } from 'src/UI/loading-spinner/loading-spinner.component';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { SnackbarService } from 'src/UI/snackbar/snackbar.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { VideoInfoDialogComponent } from '../video-info-dialog/video-info-dialog.component';

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

  constructor(public dialog: MatDialog, private shared: SharedService, private API: APIService, 
    private messageService: SnackbarService, private auth: AuthService) {}


  ngOnInit() {
    this.checkOverview();
  }


  /**
   * After the view has been initialized, this method checks the height of the video description element.
   * If the height exceeds the maximum height, the element is marked as collapsible and initially displayed as collapsed.
   */
  ngAfterViewInit() {
    setTimeout(() => {
      let currentHeight = this.video_description.nativeElement.offsetHeight;

      if (currentHeight > this.maxHeight) {
          this.isCollapsed = true;
          this.isCollapsable = true;
      }
    }, 1100);
  }


  /**
   * Checks whether video overview data is available.
   * If not, the method retrieves the first video data from the API.
   * Otherwise, the method retrieves the video overview with the existing data.
   */
  checkOverview() {
    let respData = this.shared.getVideoOverviewData();

    if (respData === undefined || respData.length === 0) {
      this.getFirstVideoFromAPI();
    } else {
      this.getVideoOverview(respData);
    }
  }

  /**
   * Retrieves the first video data from the API and initializes the view after loading the data.
   */
  async getFirstVideoFromAPI() {
    let resp = await this.API.getAllVideos();
    this.overviewData = resp[0];
    this.loadCategories(resp[0]);
    this.checkMyList(resp[0].id);
    setTimeout(() => { this.showContent = true }, 1000);
  }


  /**
   * Refreshes the video overview with the existing data and initializes the view after loading the data.
   * @param respData The existing video data for updating the overview.
   */
  getVideoOverview(respData: Object) {
    this.overviewData = respData[0];
    this.loadCategories(respData[0]);
    this.checkMyList(respData[0].id);
    setTimeout(() => { this.showContent = true }, 1000);
  }


  /**
   * Loads the categories for the specified video from the category IDs and adds them to the list of video categories.
   * @param data The video object for which the categories are to be loaded.
   */
  async loadCategories(data: { category: string; }) {
    let categoryArray = data.category.split(',').map((x: string | number)=>+x);
    for (let index = 0; index < categoryArray.length; index++) {
      let resp = await this.API.getCategoryName(categoryArray[index]);

      if (resp !== undefined) {
        this.videoCategory.push(resp);
      }
    }
  }


  /**
   * Checks whether the video with the specified ID is contained in the user's 'My list'.
   * @param id The ID of the video to be checked.
   */
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
    playerDialog.componentInstance.videoURL = `https://backend.anastasiia-uenal.de${this.overviewData.video_file}`;
  }


  /**
   * Adds the currently displayed video to the user's 'My list'.
   */
  addVideoToMyList() {
    let body = {
      'list': this.overviewData.id, 
      'creator': this.auth.loggedUser.user_id
    };  

    this.API.postVideoToList(body);
    this.messageService.showSnackMessage('Added to my list!');
    this.listExist = true;
  }


  /**
   * Removes the currently displayed video from the user's 'My list'.
   */
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