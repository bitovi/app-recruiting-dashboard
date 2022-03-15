import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { environment as env } from '../environments/environment';
import { AuthModule } from '@auth0/auth0-angular';
// import * as socketio from '@feathersjs/socketio-client';

import { NglModule } from 'ng-lightning';
import { LoginComponent } from './pages/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ApiInterceptor } from './core/interceptors/api-interceptor';


@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NglModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        ...env.httpInterceptor,
      },
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
