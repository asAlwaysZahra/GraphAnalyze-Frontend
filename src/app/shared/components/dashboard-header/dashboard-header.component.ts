import { Component, Input } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent {
  @Input({ required: true }) title = '';
  profilePic = 'empty-profile.png';

  constructor(private themeService: ThemeService) {}

  changeTheme() {
    this.themeService.changeThemeState();
    this.themeService.theme$.subscribe((data) => {
      const themeChanger = document.getElementById(
        'theme-changer-icon'
      ) as HTMLElement;
      if (data === 'dark') {
        themeChanger.textContent = 'light_mode';
      } else {
        themeChanger.textContent = 'dark_mode';
      }
    });
  }
}
