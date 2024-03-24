import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { APIService } from '../../services/api.service';
import { Router } from '@angular/router';
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


  constructor(private API: APIService, private router: Router, private shared: SharedService) { }


  async ngOnInit() {
    this.myList = await this.API.getMyList(1);
    this.checkMyList(this.videos[2].id);
    this.slideCover();
  }


  slideCover() {
    setInterval(() => {
      for (let index = 0; index < this.coverIndex.length; index++) {
        this.coverIndex[index]++;
        this.coverIndex[index] = this.coverIndex[index] % this.videos.length;
        this.checkMyList(this.videos[this.coverIndex[2]].id);
      }
    }, 5000);
  }


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


  addVideoToMyList(videoID: number) {
    let body = {
      'list': videoID, 
      'creator': 1
    };  

    this.API.postVideoToList(body);
    this.listExist = true;
  }


  async removeVideoFromMyList(videoID) {
    let idString = videoID.toString();
    let listID = this.myList.find((o: { list: string; }) => o.list === idString);
    this.API.deleteVideoFromList(listID.id);
    this.listExist = false;
  }
}
