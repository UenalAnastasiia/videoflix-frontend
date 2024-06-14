import { Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router';
import { SharedService } from 'src/services/shared.service';
import { SecondsToHoursPipe } from 'src/pipes/seconds-to-hours.pipe';


@Component({
  selector: 'app-video-tabs',
  standalone: true,
  imports: [MatTabsModule, MatButtonModule, MatIconModule, SecondsToHoursPipe],
  templateUrl: './video-tabs.component.html',
  styleUrl: './video-tabs.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class VideoTabsComponent implements OnInit {
  @ViewChildren('tabContent', { read: ElementRef }) tabContent: QueryList<ElementRef>;
  @ViewChild('allContent') allContent: ElementRef<any>;
  @Input() categories: any;
  @Input() videos: any;
  scrollAmount: number = 0;
  step: number = 100;
  tabVideos: any = [];
  hideScrollBtn: boolean = false;
  showContent: boolean = true;
  contentCategories: any;

  constructor(private router: Router, public shared: SharedService) { }


  ngOnInit() {
    this.contentCategories =  this.categories.filter((cont: { content: boolean; }) => cont.content === true);
  }


  /**
   * Handles the event when switching tabs and filters videos by category.
   * @param event The event object that contains information about the selected tab.
   */
  getTabVideosEvent(event: { tab: { textLabel: any; }; }) {
    if (event.tab.textLabel !== 'All') {
      this.scrollAmount = 0;
      this.tabVideos = [];
      let item = this.contentCategories.find((cat: { name: any; }) => cat.name === event.tab.textLabel);
    
      for (let index = 0; index < this.videos.length; index++) {
        let videoCategoryArray = this.videos[index].category.split(',').map((x: string | number)=>+x);
        
        if (videoCategoryArray.includes(item.id)) {
          this.tabVideos.push(this.videos[index]);
        }
      }
      this.tabVideos.length === 0 ? this.showContent = false : this.showContent = true; 
      this.tabVideos.length <= 4 ? this.hideScrollBtn = true : this.hideScrollBtn = false; 
    }
  }


  /**
   * Checks whether a given category ID is contained in the list of video categories.
   * Resets the scroll quantity to 0 before the check is performed.
   *
   * @param {string} categoryID - The ID of the category to be checked.
   * @param {string | any[]} videoCategory - A category (as a string) or a list of categories (as an array), 
   * that are assigned to the video.
   * @returns {boolean} - Returns true if the category ID is contained in the list of video categories,
   * false otherwise.
   */
  checkVideoCategory(categoryID: string, videoCategory: string | any[]) {
    this.scrollAmount = 0;
    if (videoCategory.includes(categoryID)) {
      return true
    } else {
      return false
    }
  }


  /**
   * Handles keyboard input to control side scrolling.
   * Responds to the "right" and "left" arrow keys to scroll accordingly.
   * @param event The keyboard event object that contains the pressed key.
   */
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


  /**
   * Controls the lateral scrolling of the content area in the specified direction.
   * @param direction The direction in which to scroll ('left' for left, 'right' for right).
   */
  sideScroll(direction: string) {
      let scrollTimer = setInterval(() => {
        if(direction == 'left'){
          this.allContent.nativeElement.scrollLeft -= this.step;
          this.tabContent.forEach((elm) => elm.nativeElement.scrollLeft -= this.step)
        } else {
          this.allContent.nativeElement.scrollLeft += this.step;
          this.tabContent.forEach((elm) => elm.nativeElement.scrollLeft += this.step)
        }
  
        this.scrollAmount += this.step;
        if (this.scrollAmount >= this.step) { window.clearInterval(scrollTimer); }
      }, this.step / 4);
  }
}