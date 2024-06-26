import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, lastValueFrom, of, throwError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SnackbarService } from 'src/UI/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  myList: any = [];

  constructor(private http: HttpClient, private messageService: SnackbarService) { }


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
    let resp: any = await lastValueFrom(this.http.get(endpoint));
    
    if (resp.length !== 0) {
      let category = resp.name;
      return category;
    }
  }


  postCategoryToDB(body) {
    const endpoint = environment.baseURL + '/category/';
    return lastValueFrom(this.http.post(endpoint, body));
  }


  patchCategory(categoriesID) {
    for (let index = 0; index < categoriesID.length; index++) {
      const endpoint = environment.baseURL + `/category/${categoriesID[index]}/`;
      let body = { 'content': true };
      lastValueFrom(this.http.patch(endpoint, body));
    }
  }


  patchCategoryContent(categoriesID) {
    if (categoriesID.includes(' ')) {
      categoriesID.split(' ');
    }
    const endpoint = environment.baseURL + `/category/${categoriesID}/`;
    let body = { 'content': false };
    lastValueFrom(this.http.patch(endpoint, body));
  }


  deleteCategoryFromDB(id: number) {
    const endpoint = environment.baseURL + `/category/${id}/`;
    lastValueFrom(this.http.delete(endpoint));
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


  postVideoToDB(uploadData: FormData): Observable<HttpEvent<any>> {
    const endpoint = environment.baseURL + '/videos/';
    const req = new HttpRequest('POST', endpoint, uploadData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


  deleteVideoFromDB(id: number) {
    const endpoint = environment.baseURL + `/videos/${id}/`;
    lastValueFrom(this.http.delete(endpoint));
  }


  postVideoToList(body: { list: number; creator: number; }) {
    const endpoint = environment.baseURL + '/list/';
    lastValueFrom(this.http.post(endpoint, body));
  }


  deleteVideoFromList(id: number) {
    const endpoint = environment.baseURL + `/list/delete/${id}/`;
    lastValueFrom(this.http.delete(endpoint));
  }


  getUser(id: number) {
    const endpoint = environment.baseURL + `/users/${id}/`;
    return lastValueFrom(this.http.get(endpoint));
  }


  getUserUploads(id: number) {
    const endpoint = environment.baseURL + `/users/uploads/${id}/`;
    return lastValueFrom(this.http.get(endpoint));
  }


  getUserCategories(id: number) {
    const endpoint = environment.baseURL + `/users/categories/${id}/`;
    return lastValueFrom(this.http.get(endpoint));
  }


  patchUser(id, body) {
    const endpoint = environment.baseURL + `/users/${id}/`;
    lastValueFrom(this.http.patch(endpoint, body));
  }


  checkVideoURLExists(url: string): Observable<boolean> {
    return this.http.head(url, { observe: 'response' }).pipe(
      map(response => {
        return response.status === 200;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.messageService.showSnackMessage('Sorry, video can not be load...');
          return of(false);
        } else {
          return throwError(error);
        }
      })
    );
  }
}
