import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;
    let headers: HttpHeaders = new HttpHeaders();

    if (
      request.url.includes(environment.api) ||
      request.url.includes('localhost')
    ) {
      headers = headers.set('Authorization', `Bearer ${environment.apiKey}`);
    }

    request = req.clone({ headers });

    return next.handle(request);
  }
}
