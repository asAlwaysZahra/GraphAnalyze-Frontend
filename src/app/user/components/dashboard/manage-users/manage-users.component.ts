import { Component, OnInit } from '@angular/core';
import {
  GetUserResponse,
  UserData,
} from '../../../interfaces/manage-users.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { PageEvent } from '@angular/material/paginator';
import { UserDeleteConfirmationComponent } from './user-delete-confirmation/user-delete-confirmation.component';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss',
})
export class ManageUsersComponent implements OnInit {
  usersData!: UserData[];
  displayedColumns: string[] = [
    'username',
    'fullName',
    'phoneNumber',
    'email',
    'edit/delete',
  ];
  length!: number;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor(
    private readonly dialog: MatDialog,
    private adminService: AdminService,
  ) {}

  ngOnInit(): void {
    this.adminService
      .getUsers(this.pageSize, this.pageIndex)
      .subscribe((res: GetUserResponse) => {
        this.usersData = res.users;
        this.length = res.count;
        this.pageIndex = res.thisPage;
      });
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  addUser() {
    this.dialog.open(AddUserComponent, {
      width: '105rem',
    });
  }

  editUser(guid: string) {
    console.log(guid);
  }

  deleteUser(userData: UserData) {
    this.dialog.open(UserDeleteConfirmationComponent, {
      width: '22rem',
      data: userData,
    });
  }
}
