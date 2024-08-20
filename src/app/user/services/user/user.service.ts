import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:44322/api/User';

  constructor(private http: HttpClient) {}

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
