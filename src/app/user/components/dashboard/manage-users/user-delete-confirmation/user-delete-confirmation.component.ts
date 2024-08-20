import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-delete-confirmation',
  template: `
    <h2 mat-dialog-title>Delete file</h2>
    <mat-dialog-content>
      Would you like to delete cat.jpeg?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>No</button>
      <button
        mat-button
        mat-dialog-close
        cdkFocusInitial
        (click)="deleteBook(bookName)"
      >
        Ok
      </button>
    </mat-dialog-actions>
  `,
})
export class UserDeleteConfirmationComponent {
  constructor(@Inject(MAT_DIALOG_DATA) protected bookName: string) {}

  deleteBook(name: string) {
    console.log(name);
  }
}
