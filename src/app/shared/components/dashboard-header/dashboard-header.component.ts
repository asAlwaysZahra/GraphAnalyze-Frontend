import { Component, Input } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent {
  @Input({ required: true }) title = '';
  profilePic = 'empty-profile.png';

  constructor(
    private themeService: ThemeService,
    private _snackBar: MatSnackBar
  ) {}

  changeTheme() {
    this.themeService.changeThemeState();
    this.themeService.theme$.subscribe((data) => {
      const themeChanger = document.getElementById(
        'theme-changer-icon'
      ) as HTMLElement;
      themeChanger.textContent = data === 'dark' ? 'light_mode' : 'dark_mode';
    });
  }

  infoClick() {
    this._snackBar.open('Coming soon...', 'Ok :(', { duration: 2000 });
  }
}
