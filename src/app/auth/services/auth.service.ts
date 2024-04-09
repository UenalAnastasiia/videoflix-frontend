import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName: string = '';
  firstName: string = '';
  fullName: string = '';
  userImg: any;
  userEmail: string = '';
  errorResetMessage: any;
  error: string = '';

  constructor(private http: HttpClient) { }


  public loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseURL + '/login/';
    const body = {
      "username": username,
      "password": password
    };

    return lastValueFrom(this.http.post(url, body));
  }


  async getLoggedUser() {
    let JSONdata = JSON.parse(localStorage.getItem('user'));
    if (JSONdata) {
      const url = environment.baseURL + `/users/${JSONdata.id}/`;
      let loggedUser = await lastValueFrom(this.http.get(url));
      
      this.userName = loggedUser[0]['username'];
      this.firstName = loggedUser[0]['first_name'];
      this.fullName = loggedUser[0]['first_name'] + ' ' + loggedUser[0]['last_name'];
      this.userEmail = loggedUser[0]['email'];
      //this.userImg
    } 
  }


  register(body: any): Observable<any> {
    const url = environment.baseURL + '/register/'; 
    return this.http.post(url, body);
  }


  sendMailForPasswordReset(body: { email: string; }) {
    const url = environment.baseURL + '/password_reset/';
    lastValueFrom(this.http.post(url, body));
  }


  resetPasswordInDB(token: string, newPassword: string): Observable<any> {
    const url = `${environment.baseURL}/password_reset/confirm/`;
    const body = {
      token: token,
      password: newPassword
    };
    return this.http.post(url, body);
  }

}
