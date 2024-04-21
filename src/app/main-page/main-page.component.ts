import { Component, OnInit } from '@angular/core';
import { CoverSliderComponent } from '../cover-slider/cover-slider.component';
import { VideoTabsComponent } from '../video-tabs/video-tabs.component';
import { VideoOverviewComponent } from '../video-overview/video-overview.component';
import { APIService } from '../../services/api.service';
import { LoadingSpinnerComponent } from 'src/UI/loading-spinner/loading-spinner.component';
import { AuthService } from '../auth/services/auth.service';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CoverSliderComponent, VideoTabsComponent, VideoOverviewComponent, LoadingSpinnerComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  videos: any = [];
  categories: any = [];
  showContent: boolean = false;
  error: boolean = false;


  constructor(private API: APIService, private auth: AuthService) { }


  async ngOnInit() {
    try {
      this.videos = await this.API.getAllVideos();
      this.categories = await this.API.getAllCategories();
    } catch(e) {
      console.log('Error by loading videos')
      this.error = true;
    } finally {
      setTimeout(() => {
        this.showContent = true;
      }, 1000);
    }

    let resp = this.auth.getLoggedUser();
    console.log('User ', resp);
    
  }
}
