import { Component, OnInit } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'brd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.loginWithRedirect().subscribe(resp => {
      console.log('response', resp);
      this.router.navigate([`dashboard`]).then();
    }, error =>  {
      console.log('response', error);
    });
  }

}
