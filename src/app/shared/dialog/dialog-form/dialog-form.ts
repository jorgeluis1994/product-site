import { Component, inject } from '@angular/core';
import { DialogFormService } from '../../services/dialog.service';

@Component({
  selector: 'app-dialog-form',
  standalone: true, 
  imports: [],
  templateUrl: './dialog-form.html',
  styleUrl: './dialog-form.scss',
})
export class DialogForm {
  
  public dialogService = inject(DialogFormService);

  closeModal() {
    this.dialogService.close(); 
  }
}
