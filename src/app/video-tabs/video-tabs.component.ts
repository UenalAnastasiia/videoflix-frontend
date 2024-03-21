import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { SecondsToHoursPipe } from '../../pipes/seconds-to-hours.pipe';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VideoPlayerComponent } from '../video-player/video-player.component';

@Component({
  selector: 'app-video-tabs',
  standalone: true,
  imports: [MatTabsModule, MatButtonModule, MatIconModule, SecondsToHoursPipe, MatDialogModule],
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


  constructor(public dialog: MatDialog) {}


  ngOnInit() { }


  openVideo(file: string) {
    let playerDialog = this.dialog.open(VideoPlayerComponent);
    playerDialog.componentInstance.videoURL = `http://127.0.0.1:8000/${file}`;
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