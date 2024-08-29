import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatDeleteConfirmComponent } from './cat-delete-confirm.component';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CatDeleteConfirmComponent', () => {
  let component: CatDeleteConfirmComponent;
  let fixture: ComponentFixture<CatDeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatDeleteConfirmComponent],
      imports: [MatDialogModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            category: {
              id: 10,
              name: 'mamad',
              count: 50,
            },
            pageSize: 10,
            pageIndex: 0,
          },
        },
        { provide: MatDialogRef, useValue: {} },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CatDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
