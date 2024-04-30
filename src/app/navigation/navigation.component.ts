import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { SharedService } from 'src/services/shared.service';
import { AuthService } from '../auth/services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule, CommonModule, MatTooltipModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  urlName: string = 'videoflix';

  
  constructor(public shared: SharedService, private auth: AuthService) { }


  ngOnInit() {
    this.urlName = location.pathname;
  }


  logOut() {
    try {
      this.auth.logout();
      window.location.href = '/login';
    } catch(e) {
      console.error('Error in Logout: ', e);    
    }
}
}