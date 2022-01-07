import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private readonly idToken$: Observable<string> =
    this.authService.idTokenClaims$.pipe(
      map((idTokenClaim) => idTokenClaim.__raw)
    );

  constructor(private readonly authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.idToken$.pipe(
      take(1),
      switchMap((idToken) => {
        if (
          req.url.includes('recruiting-dashboard-api') ||
          req.url.includes('localhost')
        ) {
          return next.handle(
            req.clone({
              headers: req.headers.set('Authorization', `Bearer ${idToken}`),
            })
          );
        }
        return next.handle(req);
      })
    );
  }
}
