import { NgModule } from '@angular/core';
import { NglModule } from 'ng-lightning';
import { LoadingSpinnerModule } from '../shared/components';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [AuthRoutingModule, NglModule, LoadingSpinnerModule],
  declarations: [LoginComponent, AuthComponent],
})
export class AuthModule {}
