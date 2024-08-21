import { Component, Inject, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA)
    protected page: {
      pagSize: number;
      pageIndex: number;
    },
  ) {}

  myForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      roleName: new FormControl(),
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.adminService.createUser(
        this.myForm.value,
        this.page.pagSize,
        this.page.pageIndex,
      );
    }
  }
}
