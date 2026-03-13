import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // Inyectamos el servicio dentro de la función del interceptor
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error capturado por el Interceptor:', error);

      // Extraemos el mensaje del error o usamos uno por defecto
      const errorMessage = error.error?.message || 'Algo salió mal en el servidor';

      // Mostramos la notificación visual (Excepción visual solicitada)
      notificationService.show(`Error: ${errorMessage}`, 'error');

      // Propagamos el error para que el componente también pueda manejarlo si lo necesita
      return throwError(() => error);
    })
  );
};
