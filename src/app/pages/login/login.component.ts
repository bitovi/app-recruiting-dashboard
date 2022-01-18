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

  login(): void {
    this.router.navigateByUrl(`/dashboard`);
  }

  onSubmit(): void {
    this.authService.loginWithRedirect().subscribe(
      (resp) => {
        console.log('response', resp);
        this.router.navigate([`dashboard`]).then();
      },
      (error) => {
        console.log('response', error);
      }
    );
  }
}
