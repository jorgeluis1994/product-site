import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';
// import { NotificationService } from '../../services/notification.service'; // Ajusta la ruta

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule], // Necesario para el pipe 'async' y '@if'
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification {
  // Inyección de dependencia (Clean Code: inyectamos el servicio que maneja el estado)
  public notificationService = inject(NotificationService);

  // Método opcional para cerrar manualmente si añades un botón 'x'
  close() {
    // Podrías añadir un método en el servicio para limpiar el estado
    // this.notificationService.clear();
  }
}
