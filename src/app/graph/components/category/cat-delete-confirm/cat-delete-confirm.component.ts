import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryData } from '../../../model/Category';

@Component({
  selector: 'app-cat-delete-confirm',
  template: `
    <h2 mat-dialog-title>Delete User</h2>
    <mat-dialog-content>
      Would you like to delete <b>{{ this.pageData.category.name }}</b
      >?
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
export class CatDeleteConfirmComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected pageData: {
      category: CategoryData;
      pagSize: number;
      pageIndex: number;
    }
  ) {}

  deleteUser() {
    // this.adminService.deleteUser(
    //   this.pageData.user.guid,
    //   this.pageData.pagSize,
    //   this.pageData.pageIndex
    // );
    console.log(1);
  }
}
