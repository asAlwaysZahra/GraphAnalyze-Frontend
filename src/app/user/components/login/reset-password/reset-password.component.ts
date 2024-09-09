import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  hide = signal(true);
  password = '';

  hidePassClick(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
