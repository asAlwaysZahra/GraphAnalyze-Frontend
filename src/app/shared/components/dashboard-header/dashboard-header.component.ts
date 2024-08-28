import { AfterViewInit, Component, Input } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../user/services/auth/auth.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent implements AfterViewInit {
  @Input({ required: true }) title = '';
  profilePic = 'empty-profile.png';

  constructor(
    private themeService: ThemeService,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.authService
      .getPermissions()
      .subscribe(
        (data) =>
          (this.profilePic =
            data?.image == 'default-image-url' || !data?.image
              ? 'empty-profile.png'
              : data?.image)
      );
  }

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
    this._snackBar.open(
      "No Problem! Here's the Information About the Mercedes CLR GTR",
      'LOL',
      {
        duration: 2000,
        panelClass: ['info-notification'],
      }
    );
  }
}
