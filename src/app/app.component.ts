import { Component } from '@angular/core';
import { AuthState } from "@auth0/auth0-angular";

@Component({
  selector: 'brd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-recruiting-dashboard';

  constructor(public authService: AuthState) {
  }
}
