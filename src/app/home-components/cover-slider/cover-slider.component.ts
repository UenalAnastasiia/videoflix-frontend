import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/UI/snackbar/snackbar.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { APIService } from 'src/services/api.service';
import { SharedService } from 'src/services/shared.service';


@Component({
  selector: 'app-cover-slider',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './cover-slider.component.html',
  styleUrl: './cover-slider.component.scss'
})
export class CoverSliderComponent implements OnInit {
  @Input() videos: any;
  coverIndex = [4, 3, 2, 1, 0];
  showCover: boolean = true;
  listExist: boolean;
  myList: any = [];

  constructor(private API: APIService, private router: Router, 
    public shared: SharedService, private messageService: SnackbarService, private auth: AuthService) { }


  async ngOnInit() {
    this.myList = await this.API.getMyList(this.auth.loggedUser.user_id);
    this.checkMyList(this.videos[2].id);
    this.slideCover();
  }


  /**
   * Starts scrolling through the video covers at a set interval.
   * The video covers are changed every 5 seconds.
   */
  slideCover() {
    setInterval(() => {
      for (let index = 0; index < this.coverIndex.length; index++) {
        this.coverIndex[index]++;
        this.coverIndex[index] = this.coverIndex[index] % this.videos.length;
        this.checkMyList(this.videos[this.coverIndex[2]].id);
      }
    }, 5000);
  }


  /**
   * Checks whether a video with the specified ID exists in the 'My list'.
   * @param id The ID of the video to be checked
   */
  checkMyList(id: number) {
    let resp = [];
    let idString = id.toString();
    resp.push(this.myList);
    let exist = this.shared.findItemInArray(resp, idString);
    exist ? this.listExist = true : this.listExist = false;
  }


  openVideoOverview(data: any) {
    this.router.navigateByUrl('/overview');
    this.shared.pushOverviewData(data);
  }


  /**
   * Adds the specified video to the "My list".
   * Sends a request to add the video to the API service and displays a success message.
   * @param videoID The ID of the video to be added to the list
   */
  addVideoToMyList(videoID: number) {
    let body = {
      'list': videoID, 
      'creator': this.auth.loggedUser.user_id
    };  

    this.API.postVideoToList(body);
    this.messageService.showSnackMessage('Added to my list!');
    this.listExist = true;
  }


  /**
   * Removes the specified video from the "My list".
   * Retrieves the user's "My List", searches for the video in the list and then removes it.
   * @param videoID The ID of the video to be removed from the list
   */
  async removeVideoFromMyList(videoID) {
    let idString = videoID.toString();
    this.myList = await this.API.getMyList(this.auth.loggedUser.user_id);
    let listID = this.myList.find((o: { list: string; }) => o.list === idString);
    this.API.deleteVideoFromList(listID.id);
    this.messageService.showSnackMessage('Removed from my list!');
    this.listExist = false;
  }
}