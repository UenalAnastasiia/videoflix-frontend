import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}