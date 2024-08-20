import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  UrlTree,
  CanActivateChildFn,
  CanActivateChild,
} from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../user/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot) {
    const requiredPermission = childRoute.data['permission'];
    if (requiredPermission === undefined) {
      return true;
    }

    return this.authService.getPermissions().pipe(
      map((permissions) => {
        if (permissions?.permission.includes(requiredPermission)) {
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return [false];
      })
    );
  }
}
