import { Component, OnInit } from '@angular/core';
import { CoverSliderComponent } from '../cover-slider/cover-slider.component';
import { VideoTabsComponent } from '../video-tabs/video-tabs.component';
import { VideoOverviewComponent } from '../video-overview/video-overview.component';
import { APIService } from '../../services/api.service';
import { LoadingSpinnerComponent } from 'src/UI/loading-spinner/loading-spinner.component';
import { AuthService } from '../auth/services/auth.service';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoverSliderComponent, VideoTabsComponent, VideoOverviewComponent, LoadingSpinnerComponent, NavigationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
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
  }
}
