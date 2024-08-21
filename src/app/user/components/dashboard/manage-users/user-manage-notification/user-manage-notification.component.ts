import { Component } from '@angular/core';

@Component({
  selector: 'app-user-manage-notification',
  template: `
    <span matSnackBarLabel> Pizza party!!! </span>
    <span matSnackBarActions>
      <button mat-button matSnackBarAction>🍕</button>
    </span>
  `,

  styles: `:host{display:flex}`,
})
export class UserManageNotificationComponent {}
