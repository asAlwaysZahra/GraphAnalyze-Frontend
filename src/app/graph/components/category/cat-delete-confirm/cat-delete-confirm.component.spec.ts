import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatDeleteConfirmComponent } from './cat-delete-confirm.component';

describe('CatDeleteConfirmComponent', () => {
  let component: CatDeleteConfirmComponent;
  let fixture: ComponentFixture<CatDeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatDeleteConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
