import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../api-config/api-url';
import { Subject } from 'rxjs';
import { GetCategoriesResponse } from '../../model/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = environment.apiUrl + '/api/Categories';

  private notification = new Subject<{ status: boolean; message: string }>();
  notification$ = this.notification.asObservable();

  private categoriesData = new Subject<GetCategoriesResponse>();
  categoriesData$ = this.categoriesData.asObservable();

  constructor(private httpClient: HttpClient) {}

  getCategories(pageSize = 10, pageNumber = 0) {
    return this.httpClient
      .get<GetCategoriesResponse>(
        this.apiUrl + `?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {
          withCredentials: true,
        },
      )
      .subscribe((cats) => {
        this.categoriesData.next(cats);
      });
  }

  createCategory(name: string) {
    return this.httpClient.post(
      this.apiUrl,
      { name: name },
      {
        withCredentials: true,
      },
    );
  }

  updateCategory(category: { id: number; name: string }) {
    return this.httpClient.put(this.apiUrl + `/${category.id}`, category, {
      withCredentials: true,
    });
  }

  deleteCategory(id: number) {
    console.log('deleteCategory', id);
    return this.httpClient.delete(this.apiUrl + `/${id}`, {
      withCredentials: true,
    });
  }
}
