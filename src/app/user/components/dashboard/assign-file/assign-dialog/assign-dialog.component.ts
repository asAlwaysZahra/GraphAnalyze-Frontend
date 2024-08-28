import { Component, computed, Inject, model, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrl: './assign-dialog.component.scss',
})
export class AssignDialogComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentUser = model('');
  readonly users: User[] = [];
  readonly allUsers = [
    { id: 1, name: 'mamad' },
    { id: 2, name: 'hasan' },
  ];

  readonly filteredUsers = computed(() => {
    const currentUser = this.currentUser().toLowerCase();
    return currentUser
      ? this.allUsers.filter((user) =>
          user.name.toLowerCase().includes(currentUser)
        )
      : this.allUsers.slice();
  });

  constructor(@Inject(MAT_DIALOG_DATA) protected id: number) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    return '';
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.users.includes(event.option.value)) {
      this.users.push(event.option.value);
    }

    this.currentUser.set('');
    event.option.deselect();
  }

  remove(user: User) {
    const index = this.users.indexOf(user);
    if (index < 0) {
      return this.users;
    }

    this.users.splice(index, 1);
    return [...this.users];
  }
}
