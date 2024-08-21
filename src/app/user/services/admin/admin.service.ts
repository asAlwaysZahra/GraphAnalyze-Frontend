import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest, UpdateUserRequest } from '../../models/User';
import {
  GetUserResponse,
  UserData,
} from '../../interfaces/manage-users.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'https://localhost:44322/api/Admin';

  constructor(private http: HttpClient) {}

  createUser(request: RegisterRequest) {
    return this.http.post(`${this.apiUrl}/register`, request);
  }

  getUsers(limit = 10, page = 1) {
    return this.http.get<GetUserResponse>(
      `${this.apiUrl}/GetUsersPagination?limit=${limit}&page=${page}`,
    );
  }

  deleteUser(id: string) {
    return this.http
      .delete(`${this.apiUrl}/DeleteUser?id=${id}`, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          // this.getUsers().next();
        }),
      );
  }

  updateUser(id: string, request: UpdateUserRequest) {
    return this.http.put(`${this.apiUrl}/UpdateUser?id=${id}`, request);
  }

  getUserById(id: string) {
    //id += '1';
    return {} as UserData;
  }
}
