import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageUser } from '../../../../interfaces/manage-users.interface';
import { AdminService } from '../../../../services/admin/admin.service';

@Component({
  selector: 'app-user-delete-confirmation',
  template: `
    <h2 mat-dialog-title>Delete User</h2>
    <mat-dialog-content>
      Would you like to delete {{ this.user.userName }}?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button
        mat-button
        mat-dialog-close
        cdkFocusInitial
        (click)="deleteBook(this.user.guid)"
      >
        Delete
      </button>
    </mat-dialog-actions>
  `,
})
export class UserDeleteConfirmationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) protected user: ManageUser,
    private adminService: AdminService,
  ) {}

  deleteBook(name: string) {
    console.log(name);
    this.adminService.deleteUser(this.user.guid);
  }
}
