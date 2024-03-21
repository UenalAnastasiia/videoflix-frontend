import { Component, Input, OnInit } from '@angular/core';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-video-overview',
  standalone: true,
  imports: [VideoPlayerComponent, MatDialogModule],
  templateUrl: './video-overview.component.html',
  styleUrl: './video-overview.component.scss'
})
export class VideoOverviewComponent implements OnInit {
  @Input() overviewData: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    console.log('Data: ', this.overviewData);
  }


  playVideo() {
    let playerDialog = this.dialog.open(VideoPlayerComponent);
    playerDialog.componentInstance.videoURL = `http://127.0.0.1:8000/${this.overviewData[0].video_file}`;
  }
}
