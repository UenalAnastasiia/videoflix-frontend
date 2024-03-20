import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CoverSliderComponent } from '../cover-slider/cover-slider.component';
import { VideoTabsComponent } from '../video-tabs/video-tabs.component';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CoverSliderComponent, VideoTabsComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  videos: any = [];
  categories: any = [];
  showContent: boolean = false;
  error: boolean = false;

  constructor(private http: HttpClient) { }


  async ngOnInit() {
    try {
      this.videos = await this.loadVideos();
      this.categories = await this.loadCategories();
    } catch(e) {
      console.log('Error by loading videos')
      this.error = true;
    } finally {
      setTimeout(() => {
        this.showContent = true;
      }, 1000);
    }
  }


  loadVideos() {
    const url = environment.baseURL + '/videos/';
    return lastValueFrom(this.http.get(url));
  }


  loadCategories() {
    const url = environment.baseURL + '/category/';
    return lastValueFrom(this.http.get(url));
  }
}
