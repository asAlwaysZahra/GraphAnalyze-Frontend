import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerSuccessNotificationComponent } from './danger-success-notification.component';

describe('DangerSuccessNotificationComponent', () => {
  let component: DangerSuccessNotificationComponent;
  let fixture: ComponentFixture<DangerSuccessNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DangerSuccessNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangerSuccessNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
