import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from 'src/services/shared.service';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  urlName: string = 'settings/user';


  constructor(public shared: SharedService) { }


  ngOnInit() {
    this.urlName = location.pathname;
  }

}
