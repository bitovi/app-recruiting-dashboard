import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WidgetConfig } from '../widgets/widget.model';
import { defaultWidgets } from './default-widgets';

@Injectable({
  providedIn: 'root',
})
export class WidgetsApiService {
  private widgetsApiUrl = `${environment.api}/widgets`;

  constructor(private http: HttpClient) {}

  public getWidgets(): Observable<WidgetConfig[]> {
    return of(defaultWidgets);

    return this.http.get<WidgetConfig[]>(this.widgetsApiUrl);
  }

  public saveWidgets(widgets: WidgetConfig[]): Observable<WidgetConfig[]> {
    return of(widgets);
    return this.http.post<WidgetConfig[]>(this.widgetsApiUrl, { widgets });
  }
}
