import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'brd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(public authService: AuthService, private router: Router) {}

  public login() {
    this.authService.loginWithRedirect().subscribe({
      next: () => {},
      error: (error) => {
        console.error('response', error);
      },
    });
  }
}
