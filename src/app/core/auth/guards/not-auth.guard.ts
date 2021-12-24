import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotAutGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map((isAuth: boolean) => {
        if (isAuth || true) {
          this.router.navigateByUrl(`/dashboard`).then();
          return false;
        }
        return true;
      })
    );
  }
}
