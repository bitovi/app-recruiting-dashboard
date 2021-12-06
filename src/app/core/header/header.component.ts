import { Component, OnInit } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'brd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items = [
      { value: 'Settings', icon: 'utility:settings' },
      { value: 'Logout', icon: 'utility:logout' }];
  open = false;
  openAppList = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onClickMenuItem(type: string) {
    if(type === 'Logout') {
      this.authService.logout();
    }
  }
}
