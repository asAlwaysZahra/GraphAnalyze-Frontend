import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserData } from '../../../../interfaces/manage-users.interface';
import { AdminService } from '../../../../services/admin/admin.service';

@Component({
  selector: 'app-user-delete-confirmation',
  template: `
    <h2 mat-dialog-title>Delete User</h2>
    <mat-dialog-content>
      Would you like to delete {{ this.userData.username }}?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button
        mat-button
        mat-dialog-close
        cdkFocusInitial
        (click)="deleteUser()"
      >
        Delete
      </button>
    </mat-dialog-actions>
  `,
})
export class UserDeleteConfirmationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) protected userData: UserData,
    private adminService: AdminService
  ) {}

  deleteUser() {
    this.adminService.deleteUser(this.userData.guid);
  }
}
