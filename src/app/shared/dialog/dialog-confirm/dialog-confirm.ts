import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [],
  templateUrl: './dialog-confirm.html',
  styleUrl: './dialog-confirm.scss',
})
export class DialogConfirm {

  @Input() productName: string = '';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onCancel(): void {
    this.cancel.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }
}
