import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../../services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileData } from '../../../models/File';
import { PageEvent } from '@angular/material/paginator';
import { AssignDialogComponent } from './assign-dialog/assign-dialog.component';

@Component({
  selector: 'app-assign-file',
  templateUrl: './assign-file.component.html',
  styleUrl: './assign-file.component.scss',
})
export class AssignFileComponent {
  filesData: FileData[] = [];
  displayedColumns: string[] = ['name', 'category', 'createDate', 'assign'];
  length!: number;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor(
    private readonly dialog: MatDialog,
    private adminService: AdminService,
    private _snackBar: MatSnackBar,
  ) {}

  assignUser(element: string) {
    console.log(element);
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.length = e.length;
    // this.adminService.getUsers(e.pageSize, e.pageIndex);
  }

  openDialog(id: number) {
    this.dialog.open(AssignDialogComponent, {
      width: '105rem',
      data: id,
    });
  }
}
