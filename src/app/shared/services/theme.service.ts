import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  changeThemeState() {
    const body = document.querySelector('body') as HTMLBodyElement;
    const themeIcon = document.getElementById(
      'theme-changer-icon'
    ) as HTMLElement;

    const bodyThemeState = body.dataset['theme'];

    if (bodyThemeState === 'light') {
      body.dataset['theme'] = 'dark';
      themeIcon.textContent = 'light_mode';
    } else {
      body.dataset['theme'] = 'light';
      themeIcon.textContent = 'dark_mode';
    }
  }
}
