import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NavigationComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
