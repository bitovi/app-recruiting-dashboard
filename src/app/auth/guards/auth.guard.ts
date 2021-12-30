import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canEnterTheRoute();
  }

  public canActivateChild():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canEnterTheRoute();
  }

  public canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canEnterTheRoute();
  }

  private canEnterTheRoute(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map((isAuth: boolean) => {
        if (!isAuth) {
          this.router.navigate(['/']);

          return false;
        }

        return isAuth;
      })
    );
  }
}
