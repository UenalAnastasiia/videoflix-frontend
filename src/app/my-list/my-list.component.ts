import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-my-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.scss'
})
export class MyListComponent implements OnInit {
  myList: Object = [];
  showContent: boolean = true;
  error: boolean = false;
  videoList: any = [];


  constructor(private API: APIService, private router: Router, private shared: SharedService) { }


  async ngOnInit() {
    try {
      this.myList = await this.API.getMyList(1);
    } catch(e) {
      console.log('Error by loading List')
      this.error = true;
    } finally {
      this.loadVideos(this.myList);
    }
  }


  async loadVideos(data: any) {
    for (let index = 0; index < data.length; index++) {
      let resp = await this.API.getVideoFromList(data[index].list);
      this.videoList.push(resp[0]);
    }

    if (this.videoList.length > 0) {
      this.showContent = true;
    } else this.showContent = false;
  }


  openVideoOverview(data: any) {
    this.router.navigateByUrl('/overview');
    this.shared.pushOverviewData(data);
  }

}
