import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  videoOverviewData: any = [];

  
  constructor(private router: Router) { }


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


  navigateTo(link: string | UrlTree) {
    this.router.navigateByUrl(link);
  }
}