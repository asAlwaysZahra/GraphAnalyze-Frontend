import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFileComponent } from './assign-file.component';

describe('AssignFileComponent', () => {
  let component: AssignFileComponent;
  let fixture: ComponentFixture<AssignFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
