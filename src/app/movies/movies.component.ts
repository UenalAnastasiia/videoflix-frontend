import { Component, OnInit } from '@angular/core';
import { AlphabetTableComponent } from '../alphabet-table/alphabet-table.component';
import { APIService } from 'src/services/api.service';


@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [AlphabetTableComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {
  searchInput: string;
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

}
