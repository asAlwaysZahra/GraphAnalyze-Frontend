import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LoginRequest, LoginResponse } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://192.168.24.167:5000/api/User';
  private role$: Subject<unknown> = new Subject<unknown>();

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(this.apiUrl + '/login', loginRequest, {
      headers,
    });
  }

  getRole() {
    // return this.role$;
  }
}
