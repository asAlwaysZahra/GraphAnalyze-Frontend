import { Component, computed, Inject, model, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AssignFileService } from '../../../../services/assign-file/assign-file.service';
import { FileUserAccess } from '../../../../models/File';
import { LoadingService } from '../../../../../shared/services/loading.service';
import { DangerSuccessNotificationComponent } from '../../../../../shared/components/danger-success-notification/danger-success-notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrl: './assign-dialog.component.scss',
})
export class AssignDialogComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentUser = model('');
  users: FileUserAccess[] = [];
  allUsers: FileUserAccess[] = [];

  readonly filteredUsers = computed(() => {
    const currentUser = this.currentUser().toLowerCase();
    return currentUser
      ? this.allUsers.filter((user) =>
          user.userName.toLowerCase().includes(currentUser)
        )
      : this.allUsers.slice();
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) protected id: number,
    private assignFileService: AssignFileService,
    private loadingService: LoadingService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.assignFileService.getFileUserAccess(this.id).subscribe({
      next: (data) => {
        this.users = data;
        this.loadingService.setLoading(false);
      },
      error: (error) => {
        this._snackBar.openFromComponent(DangerSuccessNotificationComponent, {
          data: error.error.message,
          panelClass: ['notification-class-danger'],
          duration: 2000,
        });
        this.loadingService.setLoading(false);
      },
    });
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

  remove(user: FileUserAccess) {
    const index = this.users.indexOf(user);
    if (index < 0) {
      return this.users;
    }

    this.users.splice(index, 1);
    return [...this.users];
  }
}
