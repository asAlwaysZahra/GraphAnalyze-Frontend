import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { LoginRequest, LoginResponse, UserPermissions } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:44322/api/User';

  private userData = new Subject<LoginResponse>();
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private permissions = new Subject<UserPermissions>();

  isLoggedIn$ = this.isLoggedIn.asObservable();
  userData$ = this.userData.asObservable();
  permissions$ = this.permissions.asObservable();

  constructor(private http: HttpClient) {}

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
    return this.http
      .get<UserPermissions>(this.apiUrl + '/permissions', {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          if (response.username == null) this.isLoggedIn.next(false);
          else {
            this.isLoggedIn.next(true);
            this.permissions.next(response);
            console.log(response);
          }
        }),
      );
  }
}
