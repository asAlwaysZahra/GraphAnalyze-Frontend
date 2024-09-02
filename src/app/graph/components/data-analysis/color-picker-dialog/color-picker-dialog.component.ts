import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-color-picker-dialog',
  templateUrl: './color-picker-dialog.component.html',
  styleUrl: './color-picker-dialog.component.scss',
})
export class ColorPickerDialogComponent {
  selectedColor: string;

  constructor(
    public dialogRef: MatDialogRef<ColorPickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.selectedColor = data.color || '#000000'; // Default color
  }

  onConfirm(): void {
    this.dialogRef.close(this.selectedColor);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
