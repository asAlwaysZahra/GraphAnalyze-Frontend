import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../shared/services/loading.service';

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
    private loadingService: LoadingService
  ) {
    this.loadingService.setLoading(false);
  }

  logoutClick() {
    this.loadingService.setLoading(true);
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
