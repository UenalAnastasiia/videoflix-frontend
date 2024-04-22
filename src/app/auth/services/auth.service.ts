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
  loggedUser;


  constructor(private http: HttpClient) { }


  public loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseURL + '/login/';
    const body = {
      "username": username,
      "password": password
    };

    return lastValueFrom(this.http.post(url, body));
  }


  public isUserLoggedIn() {      
    if (this.loggedUser !== undefined) {
      return true
    } else {
      return false
    }
  }


  public register(body: any): Observable<any> {
    const url = environment.baseURL + '/register/'; 
    return this.http.post(url, body);
  }


  public sendMailForPasswordReset(body: { email: string; }) {
    const url = environment.baseURL + '/password_reset/';
    lastValueFrom(this.http.post(url, body));
  }


  public resetPasswordInDB(token: string, newPassword: string): Observable<any> {
    const url = `${environment.baseURL}/password_reset/confirm/`;
    const body = {
      token: token,
      password: newPassword
    };
    return this.http.post(url, body);
  }


  public logout() {
    const url = environment.baseURL + '/logout/';
    return lastValueFrom(this.http.get(url));
  }

}