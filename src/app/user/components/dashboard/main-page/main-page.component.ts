import { AfterContentInit, Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements AfterContentInit {
  fullName!: string;

  constructor(private authService: AuthService) {}

  ngAfterContentInit(): void {
    this.authService
      .getPermissions()
      .subscribe(
        (data) => (this.fullName = `${data?.firstName} ${data?.lastName}`),
      );
  }
}
