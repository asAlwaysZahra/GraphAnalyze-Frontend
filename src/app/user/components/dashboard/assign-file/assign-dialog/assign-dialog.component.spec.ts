import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDialogComponent } from './assign-dialog.component';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AssignDialogComponent', () => {
  let component: AssignDialogComponent;
  let fixture: ComponentFixture<AssignDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignDialogComponent],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatChipsModule,
        MatAutocompleteModule,
        FormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: 5,
        },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
