import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly loggedIn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor() {}

  public login() {
    console.log(1);
  }
}
