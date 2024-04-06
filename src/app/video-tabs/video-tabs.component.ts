import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { SecondsToHoursPipe } from '../../pipes/seconds-to-hours.pipe';
import { Router } from '@angular/router';
import { SharedService } from 'src/services/shared.service';


@Component({
  selector: 'app-video-tabs',
  standalone: true,
  imports: [MatTabsModule, MatButtonModule, MatIconModule, SecondsToHoursPipe],
  templateUrl: './video-tabs.component.html',
  styleUrl: './video-tabs.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class VideoTabsComponent implements OnInit {
  @ViewChild('content') content: ElementRef<any>;
  @Input() categories: any;
  @Input() videos: any;
  scrollAmount: number = 0;
  step: number = 100;
  tabVideos: any = [];


  constructor(private router: Router, private shared: SharedService) { }


  ngOnInit() { }


  getTabVideosEvent(event: { tab: { textLabel: any; }; }) {
    if (event.tab.textLabel !== 'All') {
      this.tabVideos = [];
      let item = this.categories.find((cat: { name: any; }) => cat.name === event.tab.textLabel);
    
      for (let index = 0; index < this.videos.length; index++) {
        let videoCategoryArray = this.videos[index].category.split(',').map((x: string | number)=>+x);
        
        if (videoCategoryArray.includes(item.id)) {
          this.tabVideos.push(this.videos[index]);
        }
      }
    }
  }


  @HostListener('window:keydown.ArrowRight', ['$event'])
  @HostListener('window:keydown.ArrowLeft', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.sideScroll('right');
    }

    if (event.key === 'ArrowLeft') {
      this.sideScroll('left');
    }
  }


  openVideoOverview(data: any) {
    this.router.navigateByUrl('/overview');
    this.shared.pushOverviewData(data);
  }


  sideScroll(direction: string) {
    let scrollTimer = setInterval(() => {
      if(direction == 'left'){
        this.content.nativeElement.scrollLeft -= this.step;
      } else {
        this.content.nativeElement.scrollLeft += this.step;
      }

      this.scrollAmount += this.step;
      if (this.scrollAmount >= this.step) { window.clearInterval(scrollTimer); }
    }, this.step / 4);
  }
}