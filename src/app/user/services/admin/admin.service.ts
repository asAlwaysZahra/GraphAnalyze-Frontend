import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest, UpdateUserRequest } from '../../models/User';
import {
  GetUserResponse,
  UserData,
} from '../../interfaces/manage-users.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly apiUrl = 'http://localhost:8085/api/Admin';
  private usersData = new Subject<GetUserResponse>();

  usersData$ = this.usersData.asObservable();

  constructor(private http: HttpClient) {}

  createUser(request: RegisterRequest) {
    return this.http.post(`${this.apiUrl}/register`, request, {
      withCredentials: true,
    });
  }

  getUsers(limit = 10, page = 1) {
    this.http
      .get<GetUserResponse>(
        `${this.apiUrl}/GetUsersPagination?limit=${limit}&page=${page}`,
        {
          withCredentials: true,
        }
      )
      .subscribe((users) => {
        this.usersData.next(users);
      });
  }

  deleteUser(id: string, pageSize: number, pageIndex: number) {
    this.http
      .delete(`${this.apiUrl}/DeleteUser?id=${id}`, {
        withCredentials: true,
      })
      .subscribe(() => {
        this.getUsers(pageSize, pageIndex);
      });
  }

  updateUser(id: string, request: UpdateUserRequest) {
    return this.http.put(`${this.apiUrl}/UpdateUser?id=${id}`, request);
  }

  getUserById(id: string) {
    console.log(id);
    return {} as UserData;
  }
}
