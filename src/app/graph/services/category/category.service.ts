import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../api-config/api-url';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = environment.apiUrl + '/api/Categories';

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
    return this.httpClient.delete(this.apiUrl + `/${id}`, {
      withCredentials: true,
    });
  }
}
