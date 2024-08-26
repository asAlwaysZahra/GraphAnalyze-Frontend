import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, UserPermissions } from '../../models/User';
import { environment } from '../../../../../api-config/api-url';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/User';
  private permissions = new BehaviorSubject<UserPermissions | null>(null);
  permissions$ = this.permissions.asObservable();

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/login', loginRequest, {
      withCredentials: true,
    });
  }

  getPermissions() {
    if (!this.permissions.value) {
      return this.http
        .get<UserPermissions>(this.apiUrl + '/permissions', {
          withCredentials: true,
        })
        .pipe(
          tap((response) => {
            if (response.firstName) {
              this.permissions.next(response);
            }
          }),
        );
    }
    return this.permissions$;
  }

  logout() {
    return this.http
      .post(this.apiUrl + '/logout', null, { withCredentials: true })
      .pipe(
        tap(() => {
          this.permissions.next(null);
        }),
      );
  }
}
