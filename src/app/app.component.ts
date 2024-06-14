import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedService } from 'src/services/shared.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'videoflix-frontend';
  public screenWidth: any;


  constructor(private shared: SharedService) { }
  

  ngOnInit() {
      this.screenWidth = window.innerWidth;
      this.shared.checkDeviceScreen(this.screenWidth);
  }
  
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.shared.checkDeviceScreen(this.screenWidth);
  }
}
