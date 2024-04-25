import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/services/api.service';

@Component({
  selector: 'app-categories-settings',
  standalone: true,
  imports: [],
  templateUrl: './categories-settings.component.html',
  styleUrl: './categories-settings.component.scss'
})
export class CategoriesSettingsComponent implements OnInit {
  

  constructor(private API: APIService) { }


  async ngOnInit() {
    let resp = await this.API.getUserCategories(1);
    console.log('Categories ', resp);
  }

}
