import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "@auth0/auth0-angular";
import {map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NotAutGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated$.pipe(
        take(1),
        map((isAuth: boolean) => {
          if(isAuth) {
            this.router.navigateByUrl(`/dashboard`).then();
            return false
          }
          return true
        })
    )
  }

}
