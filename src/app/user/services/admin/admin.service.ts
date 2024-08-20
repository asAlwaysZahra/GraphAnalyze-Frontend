import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest, UpdateUserRequest } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8085/api/Admin';

  constructor(private http: HttpClient) {}

  createUser(request: RegisterRequest) {
    return this.http.post(`${this.apiUrl}/register`, request);
  }

  getUsers(limit = 10, page = 1) {
    return this.http.get(
      `${this.apiUrl}/GetUsersPagination?limit=${limit}&page=${page}`
    );
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/DeleteUser?id=${id}`);
  }

  updateUser(id: string, request: UpdateUserRequest) {
    return this.http.put(`${this.apiUrl}/UpdateUser?id=${id}`, request);
  }

  firstAdmin() {
    return this.http.get(`${this.apiUrl}/firstAdmin`);
  }
}
