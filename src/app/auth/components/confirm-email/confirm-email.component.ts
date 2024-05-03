import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent {

  constructor(public shared: SharedService) { }

}
