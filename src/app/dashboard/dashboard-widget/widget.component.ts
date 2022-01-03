import { Observable } from 'rxjs';

export abstract class WidgetComponent {
  loading$!: Observable<boolean>;
}
