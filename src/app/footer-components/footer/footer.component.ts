import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SharedService } from 'src/services/shared.service';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(public shared: SharedService) { }

}
