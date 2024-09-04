import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [
        FormsModule,
        MatCheckboxModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind username and password inputs', () => {
    fixture.whenStable().then(() => {
      const usernameInput = fixture.nativeElement.querySelector(
        'input[name="userName"]',
      );
      const passwordInput = fixture.nativeElement.querySelector(
        'input[name="password"]',
      );

      usernameInput.value = 'testUser';
      passwordInput.value = 'testPassword';

      usernameInput.dispatchEvent(new Event('input'));
      passwordInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      console.log(component.username);
      console.log(component.password);

      expect(component.username).toBe('testUser');
      expect(component.password).toBe('testPassword');
    });
  });

  it('should have a disabled login button when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTruthy();
  });
});
