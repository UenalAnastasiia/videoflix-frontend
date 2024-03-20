import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SecondsToHoursPipe } from '../../pipes/seconds-to-hours.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, SecondsToHoursPipe, MatDialogModule, MatMenuModule,
    VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent {
  videoURL: any = '';

}