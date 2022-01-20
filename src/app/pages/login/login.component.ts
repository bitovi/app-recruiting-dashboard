import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'brd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  errorMessage$: Observable<Error> = this.authService.error$;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.router.navigateByUrl(`/dashboard`);
  }

  onSubmit(): void {
    this.authService.loginWithRedirect().subscribe(() => {
      this.router.navigate([`dashboard`]).then();
    });
  }
}
