import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.getPermissions().pipe(
      map((permissions) => {
        if (permissions.permission !== '') {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return [false];
      }),
    );
    // return this.authService.isLoggedIn$.pipe(
    //   map((isLoggedIn) => {
    //     if (!isLoggedIn) {
    //       this.router.navigate(['/login']);
    //       return false;
    //     }
    //     return true;
    //   }),
    // );
  }
}
