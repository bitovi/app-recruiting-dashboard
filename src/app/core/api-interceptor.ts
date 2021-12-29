import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private API_KEY = 'h84j90wdcbiy23c563r4n80brtypom';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;

    if (
      request.url.includes('recruiting-dashboard-api') ||
      request.url.includes('localhost')
    ) {
      request = req.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.API_KEY}`),
      });
    }
    return next.handle(request);
  }
}
