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
    protected userData: UserData,
  ) {}

  myForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl(this.userData.firstName, Validators.required),
      lastName: new FormControl(this.userData.lastName, Validators.required),
      username: new FormControl(this.userData.username, Validators.required),
      email: new FormControl(this.userData.email, [
        Validators.required,
        Validators.email,
      ]),
      phoneNumber: new FormControl(this.userData.phoneNumber, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      roleName: new FormControl(this.userData.roleName),
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.adminService
        .updateUser(this.userData.guid, this.myForm.value)
        .subscribe(console.log);
    }
  }
}
