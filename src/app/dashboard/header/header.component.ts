import { AuthService } from '@auth0/auth0-angular';
import { Component } from '@angular/core';

interface MenuItems {
  value: string;
  icon: string;
}

@Component({
  selector: 'brd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public items: MenuItems[] = [
    { value: 'Settings', icon: 'utility:settings' },
    { value: 'Logout', icon: 'utility:logout' },
  ];
  public open = false;
  public openAppList = false;

  constructor(private authService: AuthService) {}

  public onClickMenuItem(type: string): void {
    if (type === 'Logout') {
      this.authService.logout();
    }
  }
}
