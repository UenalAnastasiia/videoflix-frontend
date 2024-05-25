import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { MatMenuModule } from '@angular/material/menu';
import { SecondsToHoursPipe } from 'src/pipes/seconds-to-hours.pipe';
import { APIService } from 'src/services/api.service';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, SecondsToHoursPipe, MatDialogModule, MatMenuModule,
    VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements OnInit {
  videoURL: any = '';
  newVideoPath: any = '';
  quality: number = 720;
  showVideo: boolean = false;
  videoExists: boolean | null = null;


  constructor(private api: APIService) { }


  ngOnInit() {
    this.updateVideoQuality(this.quality);
  }


  updateVideoQuality(quality) {
    this.showVideo = false;
    this.quality = quality;
    let splitFilePath = this.videoURL.split("/");
    let filePath = splitFilePath.slice(0, splitFilePath.length - 1).join("/");

    let fullFileName = this.videoURL.split('/').pop();
    let splitResult = fullFileName.split('.');
    let fileName = splitResult[0];
    let extension = splitResult[1];
    this.newVideoPath = filePath + '/' + fileName + '_' + quality + 'p.' + extension;
    this.checkVideo(this.newVideoPath);
  }


  checkVideo(path: string) {
    this.api.checkVideoURLExists(path).subscribe(
      exists => this.videoExists = exists,
      error => {
        this.videoExists = null;
      }
    );
    
    setTimeout(() => { this.showVideo = true }, 500);
  }
}