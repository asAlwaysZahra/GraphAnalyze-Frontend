import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  UrlTree,
} from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (route && state) return true;
  return true;
};

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.getPermissions().pipe(
      map((permissions) => {
        if (permissions?.permission.length) {
          if (route.url[0].path !== 'dashboard') {
            return this.router.parseUrl('/dashboard');
          }
          return true;
        } else {
          if (route.url[0].path !== 'login') {
            return this.router.parseUrl('/login');
          }
          return true;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return [false];
      })
    );

    // return this.authService.permissions$.pipe(
    //   map((permissions) => {
    //     if (!permissions) {
    //       return true;
    //     } else {
    //       this.router.navigate(['/login']);
    //       return false;
    //     }
    //   }),
    //   catchError(() => {
    //     this.router.navigate(['/login']);
    //     return [false];
    //   }),
    // );
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
