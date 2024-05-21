import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-data-protection',
  standalone: true,
  imports: [MatCardModule, FooterComponent],
  templateUrl: './data-protection.component.html',
  styleUrl: './data-protection.component.scss'
})
export class DataProtectionComponent {

}
