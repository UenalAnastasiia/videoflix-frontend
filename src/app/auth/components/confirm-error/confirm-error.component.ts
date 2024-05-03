import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-confirm-error',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './confirm-error.component.html',
  styleUrl: './confirm-error.component.scss'
})
export class ConfirmErrorComponent {

  constructor(public shared: SharedService) { }

}
