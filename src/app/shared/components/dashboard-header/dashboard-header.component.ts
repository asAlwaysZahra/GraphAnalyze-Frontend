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
  }
}
