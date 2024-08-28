import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddUserComponent } from './add-user.component';
import { AdminService } from '../../../../services/admin/admin.service';
import { of } from 'rxjs';
import { RegisterRequest } from '../../../../models/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockAdminService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createUser(user: RegisterRequest, pageSize: number, pageIndex: number) {
    return of(true);
  }
}

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let adminService: MockAdminService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatRadioModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: AdminService, useClass: MockAdminService },
        { provide: MAT_DIALOG_DATA, useValue: { pagSize: 10, pageIndex: 1 } },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    adminService = TestBed.inject(AdminService) as unknown as MockAdminService;

    component.myForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      roleName: new FormControl(''),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with controls', () => {
    expect(component.myForm.contains('firstName')).toBeTruthy();
    expect(component.myForm.contains('lastName')).toBeTruthy();
    // Add assertions for all form controls
  });

  it('should call createUser on valid form submission', () => {
    spyOn(adminService, 'createUser').and.callThrough();

    component.myForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      password: 'password',
      confirmPassword: 'password',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      roleName: 'admin',
    });

    component.onSubmit();

    expect(adminService.createUser).toHaveBeenCalledWith(
      component.myForm.value,
      component.page.pagSize,
      component.page.pageIndex,
    );
  });
});
