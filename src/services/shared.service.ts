import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  videoOverviewData: any = [];

  constructor() { }


  pushOverviewData(data) {
    this.videoOverviewData = [];
    this.videoOverviewData.push(data);
  }


  getVideoOverviewData() {
    return this.videoOverviewData;
  }
}
