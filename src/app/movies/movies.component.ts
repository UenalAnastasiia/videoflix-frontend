import { Component, OnInit } from '@angular/core';
import { AlphabetTableComponent } from '../alphabet-table/alphabet-table.component';
import { APIService } from 'src/services/api.service';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from 'src/pipes/search-filter.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [AlphabetTableComponent, CommonModule, SearchFilterPipe, FormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {
  searchValue: string;
  videoData: any = [];
  error: boolean = false;
  showContent: boolean = false;


  constructor(private API: APIService) { }


  async ngOnInit() {
    try {
      this.videoData = await this.API.loadVideos();
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

}
