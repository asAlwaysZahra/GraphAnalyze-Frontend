import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent {
  @Input({ required: true }) title = '';
  profilePic = 'empty-profile.png';
}
