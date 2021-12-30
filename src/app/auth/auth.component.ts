import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'brd-auth',
  template: '<router-outlet></router-outlet>',
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit() {
    this.checkAuthState();
  }

  private checkAuthState() {
    this.authService.isAuthenticated$.pipe(take(1)).subscribe({
      next: (isAuth: boolean) => {
        if (isAuth) {
          this.router.navigate(['/dashboard']);
        }
      },
    });
  }
}
