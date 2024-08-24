import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForgetPasswordRequest, NewPasswordRequest } from '../../models/User';
import { environment } from '../../../../../api-config/api-url';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl + '/api/User';

  constructor(private http: HttpClient) {}

  forgetPassword(request: ForgetPasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reset-password`, request, {
      withCredentials: true,
    });
  }

  newPassword(request: NewPasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/new-password`, request, {
      withCredentials: true,
    });
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.apiUrl}`, { withCredentials: true });
  // }
  //
  // getUserById(id: number): Observable<User> {
  //   return this.http.get<User>(`${this.apiUrl}/${id}`, {
  //     withCredentials: true,
  //   });
  // }
  //
  // updateUser(id: number, user: User): Observable<User> {
  //   return this.http.put<User>(`${this.apiUrl}/${id}`, user, {
  //     withCredentials: true,
  //   });
  // }
  //
  // deleteUser(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`, {
  //     withCredentials: true,
  //   });
  // }
}
