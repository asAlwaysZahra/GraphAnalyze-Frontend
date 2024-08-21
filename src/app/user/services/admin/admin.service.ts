import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest, UpdateUserRequest } from '../../models/User';
import {
  GetUserResponse,
  UserData,
} from '../../interfaces/manage-users.interface';
import { Subject } from 'rxjs';
import { environment } from '../../../../../api-config/api-url';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly apiUrl = environment.apiUrl + '/api/Admin';
  private usersData = new Subject<GetUserResponse>();
  private notification = new Subject<{ status: boolean; message: string }>();

  usersData$ = this.usersData.asObservable();
  notification$ = this.notification.asObservable();

  constructor(private http: HttpClient) {}

  createUser(request: RegisterRequest) {
    return this.http.post(`${this.apiUrl}/register`, request, {
      withCredentials: true,
    });
  }

  getUsers(limit = 10, page = 0) {
    this.http
      .get<GetUserResponse>(
        `${this.apiUrl}/GetUsersPagination?limit=${limit}&page=${page}`,
        {
          withCredentials: true,
        },
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
      .subscribe({
        next: () => {
          this.getUsers(pageSize, pageIndex);
          this.notification.next({
            status: true,
            message: 'User deleted successfully!',
          });
        },
        error: (error) => {
          this.notification.next({
            status: false,
            message: error,
          });
        },
      });
  }

  updateUser(id: string, request: UpdateUserRequest) {
    console.log(22, request, id);
    return this.http.put(`${this.apiUrl}/UpdateUser?id=${id}`, request, {
      withCredentials: true,
    });
  }

  getUserById(id: string) {
    console.log(id);
    return {} as UserData;
  }
}
