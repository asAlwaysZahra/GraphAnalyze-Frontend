import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForgetPasswordRequest, NewPasswordRequest } from '../../models/User';
import { environment } from '../../../../../api-config/api-url';
import { LoadingService } from '../../../shared/services/loading.service';
import { UserInformation } from '../../models/manage-users.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl + '/api/User';

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
  ) {}

  forgetPassword(request: ForgetPasswordRequest): Observable<void> {
    this.loadingService.setLoading(true);
    return this.http.post<void>(`${this.apiUrl}/reset-password`, request, {
      withCredentials: true,
    });
  }

  newPassword(request: NewPasswordRequest): Observable<void> {
    this.loadingService.setLoading(true);
    return this.http.post<void>(`${this.apiUrl}/new-password`, request, {
      withCredentials: true,
    });
  }

  getLoginUserInfo() {
    this.loadingService.setLoading(true);
    return this.http.get<UserInformation>(
      `${this.apiUrl}/get-user-information`,
      {
        withCredentials: true,
      },
    );
  }

  updateUser(userInfo: UserInformation) {
    this.loadingService.setLoading(true);
    return this.http.put(`${this.apiUrl}/update-user`, userInfo, {
      withCredentials: true,
    });
  }
}
