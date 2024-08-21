import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManageNotificationComponent } from './user-manage-notification.component';

describe('UserManageNotificationComponent', () => {
  let component: UserManageNotificationComponent;
  let fixture: ComponentFixture<UserManageNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserManageNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManageNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
