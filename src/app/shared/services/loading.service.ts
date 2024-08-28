import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  setLoading(state: boolean) {
    console.log('service state: ', state);

    this.loading.next(state);
  }
}
