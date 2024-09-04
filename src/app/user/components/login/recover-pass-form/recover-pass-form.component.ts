import { Component, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../../../shared/services/theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../../../shared/services/loading.service';

@Component({
  selector: 'app-recover-pass-form',
  templateUrl: './recover-pass-form.component.html',
  styleUrl: './recover-pass-form.component.scss',
})
export class RecoverPassFormComponent {
  hide = signal(true);
  username = '';
  password = '';
  isLoading = false;
  recover_email = '';
  isTrueRecoverCode = false;

  constructor(
    private _snackBar: MatSnackBar,
    private loadingService: LoadingService,
  ) {
    this.loadingService.setLoading(false);
  }

  recoverClick(event: Event) {
    event.preventDefault();
    console.log(1);
  }

  sendCodeClick(event: Event) {
    event.preventDefault();
    console.log(2);
    this.isTrueRecoverCode = true;
  }

  hidePassClick(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
