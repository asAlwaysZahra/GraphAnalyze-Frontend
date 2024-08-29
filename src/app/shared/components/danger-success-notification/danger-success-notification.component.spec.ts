import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerSuccessNotificationComponent } from './danger-success-notification.component';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
} from '@angular/material/snack-bar';

describe('DangerSuccessNotificationComponent', () => {
  let component: DangerSuccessNotificationComponent;
  let fixture: ComponentFixture<DangerSuccessNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DangerSuccessNotificationComponent],
      imports: [MatSnackBarModule],
      providers: [{ provide: MAT_SNACK_BAR_DATA, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(DangerSuccessNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
