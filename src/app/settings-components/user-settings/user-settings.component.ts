import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/services/api.service';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss'
})
export class UserSettingsComponent implements OnInit {

  constructor(private API: APIService) { }


  async ngOnInit() {
    let resp = await this.API.getUser(1);
    console.log('User Set ', resp[0]);
    
  }
}
