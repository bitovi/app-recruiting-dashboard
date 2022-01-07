import { Observable } from 'rxjs';

export abstract class WidgetComponent {
  id: string;
  loading$!: Observable<boolean>;
}
