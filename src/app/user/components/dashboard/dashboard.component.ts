import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

/** @title Responsive sidenav */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  logoutClick() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
