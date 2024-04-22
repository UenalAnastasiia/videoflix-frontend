import { Component, OnInit } from '@angular/core';
import { AlphabetTableComponent } from '../alphabet-table/alphabet-table.component';
import { APIService } from 'src/services/api.service';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from 'src/pipes/search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { SharedService } from 'src/services/shared.service';
import { NavigationComponent } from '../navigation/navigation.component';


@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [AlphabetTableComponent, CommonModule, SearchFilterPipe, FormsModule, MatTooltipModule, NavigationComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {
  searchValue: string;
  videoData: any = [];
  error: boolean = false;
  showContent: boolean = false;


  constructor(private API: APIService, private router: Router, private shared: SharedService) { }


  async ngOnInit() {
    try {
      this.videoData = await this.API.getAllVideos();
    } catch(e) {
      console.log('Error by loading videos')
      this.error = true;
    } finally {
      setTimeout(() => {
        this.showContent = true;
      }, 1000);
    }
  }


  showSearchInput(value: string) {
    this.searchValue = value;
  }


  openVideoOverview(data: any) {
    this.router.navigateByUrl('/overview');
    this.shared.pushOverviewData(data);
  }

}
