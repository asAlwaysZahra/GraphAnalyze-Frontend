import { Component, inject } from '@angular/core';
import { ManageUser } from '../../../interfaces/manage-users.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { PageEvent } from '@angular/material/paginator';

const ELEMENT_DATA: ManageUser[] = [
  {
    guid: 'daw-awd-awd-awd',
    userName: 'mamad-plus',
    firstName: 'mamad',
    lastName: 'mamadi',
    phoneNumber: '09134456735',
    email: 'mojerf@yahoo.com',
    imgURL: null,
  },
  {
    guid: 'daw-awd-awd-awd',
    userName: 'mamad-plus',
    firstName: 'mamad',
    lastName: 'mamadi',
    phoneNumber: '09134456735',
    email: 'mojerf@yahoo.com',
    imgURL: null,
  },
];

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss',
})
export class ManageUsersComponent {
  displayedColumns: string[] = [
    'userName',
    'fullName',
    'phoneNumber',
    'email',
    'edit/delete',
  ];
  dataSource = ELEMENT_DATA;
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  constructor(private readonly dialog: MatDialog) {}

  addUser() {
    this.dialog.open(AddUserComponent, {
      width: '105rem',
    });
  }

  editUser(guid: string) {
    console.log(guid);
  }

  deleteUser(guid: string) {
    console.log(guid);
  }
}
