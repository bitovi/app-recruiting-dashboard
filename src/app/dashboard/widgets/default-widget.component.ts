import { Observable } from 'rxjs';
import { WidgetComponent } from './widget.component';

export class DefaultWidgetComponent implements WidgetComponent {
  id: string;
  loading$!: Observable<boolean>;
}
