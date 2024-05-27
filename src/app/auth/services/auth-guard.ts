import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { CanActivate, Router, UrlTree } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

   constructor(public service: AuthService, public router: Router) { }

   
   canActivate(): boolean | UrlTree {
       return this.service.isUserLoggedIn() ||
              this.router.parseUrl('/login');
   }
}