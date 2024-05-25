import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerComponent } from 'src/UI/loading-spinner/loading-spinner.component';
import { CoverSliderComponent } from '../cover-slider/cover-slider.component';
import { VideoTabsComponent } from '../video-tabs/video-tabs.component';
import { VideoOverviewComponent } from 'src/app/video-overview-components/video-overview/video-overview.component';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { APIService } from 'src/services/api.service';
import { SnackbarService } from 'src/UI/snackbar/snackbar.service';

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


  constructor(private API: APIService, private messageService: SnackbarService) { }


  async ngOnInit() {
    try {
      this.videos = await this.API.getAllVideos();
      this.categories = await this.API.getAllCategories();
    } catch(e) {
      this.messageService.showSnackMessage('Sorry, Error by loading videos...');
      this.error = true;
    } finally {
      this.videos.reverse();
      
      setTimeout(() => {
        this.showContent = true;
      }, 1000);
    }
  }
}
