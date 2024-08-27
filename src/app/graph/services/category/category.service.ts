import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../api-config/api-url';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = environment.apiUrl + '/api/Categories';
  private notification = new Subject<{ status: boolean; message: string }>();
  notification$: Observable<{ status: boolean; message: string }> =
    this.notification.asObservable();

  constructor(private httpClient: HttpClient) {}

  getCategories() {
    return this.httpClient.get(this.apiUrl, {
      withCredentials: true,
    });
  }

  createCategory(category: { name: string }) {
    return this.httpClient.post(this.apiUrl, category, {
      withCredentials: true,
    });
  }

  updateCategory(category: { id: number; name: string }) {
    return this.httpClient.put(this.apiUrl + `/${category.id}`, category, {
      withCredentials: true,
    });
  }

  deleteCategory(id: number) {
    return this.httpClient
      .delete(this.apiUrl + `/${id}`, {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          this.notification.next({
            status: true,
            message: 'User deleted successfully!',
          });
        },
        error: (error) => {
          this.notification.next({
            status: false,
            message: error.error.message,
          });
        },
      });
  }
}
