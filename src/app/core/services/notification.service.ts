// notification.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Alert {
  message: string;
  type: 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private alertSubject = new Subject<Alert | null>();
  alert$ = this.alertSubject.asObservable();

  show(message: string, type: 'success' | 'error' = 'success') {
    this.alertSubject.next({ message, type });
    setTimeout(() => this.alertSubject.next(null), 3000);
  }
}
