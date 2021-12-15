import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JazzApiInterceptor implements HttpInterceptor {
  private API_KEY = 'XGcVIkGndu0yaS3z2P7KM8XZ5Mc7pQz7';
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;

    if (request.url.includes('resumatorapi.com')) {
      request = req.clone({
        params: req.params.append('apikey', this.API_KEY),
      });
    }
    return next.handle(request);
  }
}
