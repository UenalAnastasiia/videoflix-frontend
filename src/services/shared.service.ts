import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  videoOverviewData: any = [];

  constructor() { }


  pushOverviewData(data: any) {
    this.videoOverviewData = [];
    this.videoOverviewData.push(data);
  }


  getVideoOverviewData() {
    return this.videoOverviewData;
  }


  findItemInArray(arr: any[], id: string) {
    return !!arr[0].find((o: { list: string; }) => o.list === id);
  }
}
