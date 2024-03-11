import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
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
    // let JSONdata = JSON.parse(localStorage.getItem('user'));
    // if (JSONdata) {
    //   let loggedUser = await this.userAPI.loadUserFromAPI(JSONdata.id);
    //   this.userName = loggedUser[0]['username'];
    //   this.firstName = loggedUser[0]['first_name'];
    //   this.fullName = loggedUser[0]['first_name'] + ' ' + loggedUser[0]['last_name'];
    //   this.userEmail = loggedUser[0]['email'];
    //   //this.userImg
    // } 
  }
}
