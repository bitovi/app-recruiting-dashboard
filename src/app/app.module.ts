import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { environment as env } from '../environments/environment';
import { AuthModule } from '@auth0/auth0-angular';

import { NglModule } from 'ng-lightning';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './core/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  DefaultDataServiceConfig,
  DefaultDataServiceFactory,
  EntityDataModule,
} from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { JazzApiInterceptor } from './core/jazz-api-interceptor';
import { JazzApiDataServiceFactory } from './dashboard/store/jazz-api-data-service.factory';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'https://api.resumatorapi.com/v1',
};

@NgModule({
  declarations: [AppComponent, LoginComponent, HeaderComponent],
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
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JazzApiInterceptor, multi: true },
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    { provide: DefaultDataServiceFactory, useClass: JazzApiDataServiceFactory },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
