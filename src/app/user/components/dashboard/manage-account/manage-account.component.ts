import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { UserInformation } from '../../../models/manage-users.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../../../shared/services/loading.service';
import { DangerSuccessNotificationComponent } from '../../../../shared/components/danger-success-notification/danger-success-notification.component';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrl: './manage-account.component.scss',
})
export class ManageAccountComponent implements OnInit {
  myForm: FormGroup;
  userInfo!: UserInformation;

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private loadingService: LoadingService,
  ) {
    this.myForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  ngOnInit() {
    this.userService.getLoginUserInfo().subscribe((data: UserInformation) => {
      this.userInfo = data;
      this.myForm.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
      });
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.userService.updateUser(this.myForm.value).subscribe({
        next: () => {
          this._snackBar.openFromComponent(DangerSuccessNotificationComponent, {
            data: 'User information updated successfully!',
            panelClass: ['notification-class-success'],
            duration: 2000,
          });
          this.loadingService.setLoading(false);
          this.userInfo = this.myForm.value;
        },
        error: (error) => {
          this._snackBar.openFromComponent(DangerSuccessNotificationComponent, {
            data: error.error.message,
            panelClass: ['notification-class-danger'],
            duration: 2000,
          });
          this.loadingService.setLoading(false);
        },
      });
    }
  }

  resetUserInfo() {
    this.myForm.patchValue({
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName,
      email: this.userInfo.email,
      phoneNumber: this.userInfo.phoneNumber,
    });
  }
}
