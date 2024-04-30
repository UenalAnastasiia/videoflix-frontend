import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoadingSpinnerComponent } from 'src/UI/loading-spinner/loading-spinner.component';
import { APIService } from 'src/services/api.service';

@Component({
  selector: 'app-categories-settings',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, LoadingSpinnerComponent, MatTooltipModule],
  templateUrl: './categories-settings.component.html',
  styleUrl: './categories-settings.component.scss'
})
export class CategoriesSettingsComponent implements OnInit {
  categoryData: any;
  showContent: boolean = false;
  deletedObjects: number[] = [];
  

  constructor(private API: APIService) { }


  async ngOnInit() {
    this.categoryData = await this.API.getUserCategories(1);

    setTimeout(() => {
      this.showContent = true;
    }, 500);
  }


  deleteCategoryFromDB(id: number) {
    this.API.deleteCategoryFromDB(id);
    this.deletedObjects.push(id);
  }


  checkValues(id: number) {
    return this.deletedObjects.includes(id);
  }

}
