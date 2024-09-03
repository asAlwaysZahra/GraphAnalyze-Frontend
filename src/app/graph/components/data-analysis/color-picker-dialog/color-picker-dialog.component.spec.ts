import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ColorPickerDialogComponent } from './color-picker-dialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('ColorPickerDialogComponent', () => {
  let component: ColorPickerDialogComponent;
  let fixture: ComponentFixture<ColorPickerDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ColorPickerDialogComponent>>;

  beforeEach(async () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ColorPickerDialogComponent],
      imports: [CommonModule, FormsModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { color: '#ff0000' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorPickerDialogComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<ColorPickerDialogComponent>
    >;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct color', () => {
    expect(component.selectedColor).toBe('#ff0000');
  });

  it('should close the dialog with the selected color on confirm', () => {
    component.selectedColor = '#00ff00';
    component.onConfirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith('#00ff00');
  });

  it('should close the dialog with null on cancel', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(null);
  });
});
