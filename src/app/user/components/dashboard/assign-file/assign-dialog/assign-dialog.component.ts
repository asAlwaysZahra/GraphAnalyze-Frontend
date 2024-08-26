import {
  Component,
  computed,
  Inject,
  inject,
  model,
  signal,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrl: './assign-dialog.component.scss',
})
export class AssignDialogComponent {
  constructor(
    // private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA)
    protected id: number,
  ) {}

  myForm: FormGroup = new FormGroup({});

  onSubmit() {
    return '';
  }

  //
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentFruit = model('');
  readonly fruits = signal(['Lemon']);
  readonly allFruits: string[] = [
    'Apple',
    'Lemon',
    'Lime',
    'Orange',
    'Strawberry',
  ];
  readonly filteredFruits = computed(() => {
    const currentFruit = this.currentFruit().toLowerCase();
    return currentFruit
      ? this.allFruits.filter((fruit) =>
          fruit.toLowerCase().includes(currentFruit),
        )
      : this.allFruits.slice();
  });

  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.update((fruits) => [...fruits, value]);
    }

    // Clear the input value
    this.currentFruit.set('');
  }

  remove(fruit: string): void {
    this.fruits.update((fruits) => {
      const index = fruits.indexOf(fruit);
      if (index < 0) {
        return fruits;
      }

      fruits.splice(index, 1);
      this.announcer.announce(`Removed ${fruit}`);
      return [...fruits];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.update((fruits) => [...fruits, event.option.viewValue]);
    this.currentFruit.set('');
    event.option.deselect();
  }
}
