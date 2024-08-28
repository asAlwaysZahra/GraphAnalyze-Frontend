import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { UserManageNotificationComponent } from './user-manage-notification.component';
import { By } from '@angular/platform-browser';

describe('UserManageNotificationComponent', () => {
  let component: UserManageNotificationComponent;
  let fixture: ComponentFixture<UserManageNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserManageNotificationComponent],
      providers: [
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: 'Test notification message',
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserManageNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the userData in the template', () => {
    const spanElement = fixture.debugElement.query(
      By.css('span'),
    ).nativeElement;
    expect(spanElement.textContent).toBe('Test notification message');
  });
});
