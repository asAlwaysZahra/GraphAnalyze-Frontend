import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CatDeleteConfirmComponent } from './cat-delete-confirm.component';
import { CategoryService } from '../../../services/category/category.service';
import { LoadingService } from '../../../../shared/services/loading.service';

describe('CatDeleteConfirmComponent', () => {
  let component: CatDeleteConfirmComponent;
  let fixture: ComponentFixture<CatDeleteConfirmComponent>;
  const mockDialogData = {
    category: { id: 1, name: 'Sample Category' },
    pageSize: 10,
    pageIndex: 0,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatDeleteConfirmComponent],
      imports: [
        MatDialogModule,
        HttpClientModule,
        MatSnackBarModule, // Import MatSnackBarModule for the snack bar
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: {} },
        CategoryService,
        LoadingService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CatDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct category name', () => {
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('mat-dialog-content b').textContent,
    ).toContain('Sample Category');
  });
});
