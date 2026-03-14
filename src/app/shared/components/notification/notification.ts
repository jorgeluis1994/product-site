import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';
// import { NotificationService } from '../../services/notification.service'; // Ajusta la ruta

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification {

  public notificationService = inject(NotificationService);

 
  close() {
    // Podrías añadir un método en el servicio para limpiar el estado
    // this.notificationService.clear();
  }
}
