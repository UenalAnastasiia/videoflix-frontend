import { HostListener, Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  videoOverviewData: any = [];
  mobilMenu: boolean = false;
  mobilDevice: boolean = false;
  screenWidth: number;

  
  constructor(private router: Router) { }


  checkDeviceScreen(screenWidth: number) {
    this.screenWidth = screenWidth;
    screenWidth <= 1000 ? this.mobilDevice = true : this.mobilDevice = false; 
  }


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
    this.mobilMenu = false;
  }


  closeMenu() {
    this.mobilMenu = false;
  }
}