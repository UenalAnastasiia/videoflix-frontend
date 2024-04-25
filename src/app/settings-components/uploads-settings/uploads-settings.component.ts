import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/services/api.service';

@Component({
  selector: 'app-uploads-settings',
  standalone: true,
  imports: [],
  templateUrl: './uploads-settings.component.html',
  styleUrl: './uploads-settings.component.scss'
})
export class UploadsSettingsComponent implements OnInit {


  constructor(private API: APIService) { }


  async ngOnInit() {
    let resp = await this.API.getUserUploads(1);
    console.log('Uploads ', resp);
    
  }

}
