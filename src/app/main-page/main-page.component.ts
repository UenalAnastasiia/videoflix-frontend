import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CoverSliderComponent } from '../cover-slider/cover-slider.component';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CoverSliderComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  videos: any = [];
  constructor(private http: HttpClient) { }


  async ngOnInit() {
    try {
      this.videos = await this.loadVideos();
      console.log('Videos: ', this.videos)
    } catch(e) {
      console.log('Error by loading videos')
    }
  }

  loadVideos() {
    const url = environment.baseURL + '/videos/';
    return lastValueFrom(this.http.get(url));
  }
}
