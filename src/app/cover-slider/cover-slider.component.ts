import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-cover-slider',
  standalone: true,
  imports: [],
  templateUrl: './cover-slider.component.html',
  styleUrl: './cover-slider.component.scss'
})
export class CoverSliderComponent implements OnInit {
  @Input() videos: any;
  nextCover: number = 2;
  currentCover = 1;
  lastCover: number = 0;
  showCover = true;

  ngOnInit() {
    this.slideCover();
  }


  slideCover() {
    setInterval(() => {
      this.currentCover++;
      this.lastCover++;
      this.nextCover++;
      this.currentCover = this.currentCover % this.videos.length;
      this.lastCover = this.lastCover % this.videos.length;
      this.nextCover = this.nextCover % this.videos.length;
      this.showCover = false;

      setTimeout(() => {
        this.showCover = true;
      }, 100);
    }, 5000);
  }
}
