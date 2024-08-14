import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from './login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://192.168.24.167:5000/api/User/login'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(this.apiUrl + '/login', loginRequest, {
      headers,
    });
  }
}
