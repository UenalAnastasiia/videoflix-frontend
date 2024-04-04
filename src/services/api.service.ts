import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  myList: any = [];

  constructor(private http: HttpClient) { }


  getAllVideos() {
    const endpoint = environment.baseURL + '/videos/';
    return lastValueFrom(this.http.get(endpoint));
  }


  getAllCategories() {
    const endpoint = environment.baseURL + '/category/';
    return lastValueFrom(this.http.get(endpoint));
  }


  async getCategoryName(id: number) {
    const endpoint = environment.baseURL + `/category/${id}/`;
    let resp = await lastValueFrom(this.http.get(endpoint));
    let category = resp[0].name;
    return category;
  }


  getMyList(userID: number) {
    const endpoint = environment.baseURL + `/list/${userID}/`;
    this.myList = lastValueFrom(this.http.get(endpoint));
    return lastValueFrom(this.http.get(endpoint));
  }


  getVideoFromList(videoID: number) {
    const endpoint = environment.baseURL + `/videos/${videoID}/`;
    return lastValueFrom(this.http.get(endpoint));
  }


  async postVideoToDB(uploadData: FormData) {
    const endpoint = environment.baseURL + '/videos/';
    let res = await lastValueFrom(this.http.post(endpoint, uploadData));
    console.log('Upload ', res);
  }


  postVideoToList(body: { list: number; creator: number; }) {
    const endpoint = environment.baseURL + '/list/';
    lastValueFrom(this.http.post(endpoint, body));
  }


  deleteVideoFromList(id: number) {
    const endpoint = environment.baseURL + `/list/${id}/`;
    lastValueFrom(this.http.delete(endpoint));
  }
}
