import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cover-slider',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
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
    // setTimeout(() => {
    //   this.showCover = true;
    //   this.slideCover();
    // }, 1000);
  }


  slideCover() {
    setInterval(() => {
      this.currentCover++;
      this.lastCover++;
      this.nextCover++;
      this.currentCover = this.currentCover % this.videos.length;
      this.lastCover = this.lastCover % this.videos.length;
      this.nextCover = this.nextCover % this.videos.length;
    }, 5000);
  }
}
