import { Component, Inject, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserData } from '../../../../interfaces/manage-users.interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA)
    protected pageData: {
      user: UserData;
      pagSize: number;
      pageIndex: number;
    },
  ) {}

  myForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl(
        this.pageData.user.firstName,
        Validators.required,
      ),
      lastName: new FormControl(
        this.pageData.user.lastName,
        Validators.required,
      ),
      username: new FormControl(
        this.pageData.user.username,
        Validators.required,
      ),
      email: new FormControl(this.pageData.user.email, [
        Validators.required,
        Validators.email,
      ]),
      phoneNumber: new FormControl(this.pageData.user.phoneNumber, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      roleName: new FormControl(this.pageData.user.roleName),
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.adminService.updateUser(
        this.pageData.user.guid,
        this.myForm.value,
        this.pageData.pagSize,
        this.pageData.pageIndex,
      );
    }
  }
}