import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }


  loadVideos() {
    const url = environment.baseURL + '/videos/';
    return lastValueFrom(this.http.get(url));
  }


  loadCategories() {
    const url = environment.baseURL + '/category/';
    return lastValueFrom(this.http.get(url));
  }


  async getCategory(id: number) {
    const url = environment.baseURL + `/category/${id}/`;
    let resp = await lastValueFrom(this.http.get(url));
    let category = resp[0].name;
    return category;
  }


  loadMyList(userID: number) {
    const url = environment.baseURL + `/list/${userID}/`;
    return lastValueFrom(this.http.get(url));
  }


  loadVideoFromList(videoID: number) {
    const url = environment.baseURL + `/videos/${videoID}/`;
    return lastValueFrom(this.http.get(url));
  }


  postVideoToList(body: { list: number; creator: number; }) {
    const url = environment.baseURL + '/list/';
    lastValueFrom(this.http.post(url, body));
  }


  deleteVideoFromList(id: number) {
    const url = environment.baseURL + `/list/${id}/`;
    lastValueFrom(this.http.delete(url));
  }
}
