import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrl: './manage-account.component.scss',
})
export class ManageAccountComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      // password: new FormControl('', Validators.required),
      // confirmPassword: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(12123, this.myForm.value);
      // this.adminService.createUser(
      //   this.myForm.value,
      //   this.page.pagSize,
      //   this.page.pageIndex
      // );
    }
  }

  setUserData() {
    console.log(1);
  }
}
