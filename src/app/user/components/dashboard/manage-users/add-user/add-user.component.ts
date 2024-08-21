import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../../../../interfaces/manage-users.interface';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  myForm: FormGroup = new FormGroup({});

  ngOnInit() {
    const userData: UserData = this.adminService.getUserById('some-id');

    this.myForm = new FormGroup({
      firstName: new FormControl(
        userData ? userData.firstName : '',
        Validators.required
      ),
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
      this.adminService.createUser(this.myForm.value).subscribe(console.log);
    }
  }
}
