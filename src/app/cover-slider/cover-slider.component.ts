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
  showCover = true;


  constructor(private API: APIService, private router: Router, private shared: SharedService) { }


  ngOnInit() {
    this.slideCover();
  }


  slideCover() {
    setInterval(() => {
      for (let index = 0; index < this.coverIndex.length; index++) {
        this.coverIndex[index]++;
        this.coverIndex[index] = this.coverIndex[index] % this.videos.length;
      }
    }, 5000);
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
  }
}
