import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category/category.service';
import { CategoryData } from '../../../model/Category';

@Component({
  selector: 'app-cat-delete-confirm',
  template: `
    <h2 mat-dialog-title>Delete User</h2>
    <mat-dialog-content>
      Would you like to delete <b>{{ this.data.name }}</b
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
    protected data: CategoryData,
    private categoryService: CategoryService,
  ) {}

  deleteUser() {
    console.log(1122, this.data);
    this.categoryService.deleteCategory(this.data.id);
  }
}
