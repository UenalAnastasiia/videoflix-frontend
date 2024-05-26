import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SharedService } from 'src/services/shared.service';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  urlName: string = 'login';


  constructor(public shared: SharedService) { }


  ngOnInit() {
    this.urlName = location.pathname;
  }

}
