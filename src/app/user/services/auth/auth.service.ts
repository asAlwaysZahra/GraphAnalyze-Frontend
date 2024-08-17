import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:44322/api/User';

  private userData = new Subject<LoginResponse>();
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedIn.asObservable();
  userData$ = this.userData.asObservable();

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.apiUrl + '/login', loginRequest)
      .pipe(
        tap((response) => {
          this.userData.next(response);
          this.isLoggedIn.next(true);
        }),
      );
  }

  getUserData() {
    return this.userData$;
  }
}
