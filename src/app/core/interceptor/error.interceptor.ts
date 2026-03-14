import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // Inyectamos el servicio dentro de la función del interceptor
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      const errorMessage = error.error?.message || 'Algo salió mal en el servidor';

      notificationService.show(`Error: ${errorMessage}`, 'error');

      return throwError(() => error);
    })
  );
};
