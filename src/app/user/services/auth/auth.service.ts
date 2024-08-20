import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  UserPermissions,
} from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:44322/api/User';

  private userData = new Subject<LoginResponse>();
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private permissions = new BehaviorSubject<UserPermissions | null>(null);

  isLoggedIn$ = this.isLoggedIn.asObservable();
  userData$ = this.userData.asObservable();
  permissions$ = this.permissions.asObservable();

  constructor(private http: HttpClient) {}

  // get isLoggedIn$() {
  //   return this.isLoggedIn.asObservable();
  // }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.apiUrl + '/login', loginRequest, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.userData.next(response);
          this.isLoggedIn.next(true);
        }),
      );
  }

  getPermissions() {
    if (!this.permissions.value) {
      this.http
        .get<UserPermissions>(this.apiUrl + '/permissions', {
          withCredentials: true,
        })
        .pipe(
          tap((response) => {
            if (response.username == null) this.isLoggedIn.next(false);
            else {
              this.isLoggedIn.next(true);
              this.permissions.next(response);
            }
          }),
        );
    }
    return this.permissions;
  }

  logout() {
    return this.http
      .get(this.apiUrl + '/log-out', { withCredentials: true })
      .pipe(
        tap(() => {
          this.isLoggedIn.next(false);
          this.permissions.next(null);
        }),
      );
  }
}
