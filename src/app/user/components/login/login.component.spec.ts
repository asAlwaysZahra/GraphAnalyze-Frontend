import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatCheckboxModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a disabled login button when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    const spy = spyOn(component, 'clickEvent');
    const button = fixture.nativeElement.querySelector(
      'button[mat-icon-button]',
    );
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should call loginClick when login button is clicked', () => {
    const spy = spyOn(component, 'loginClick');
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should toggle the theme when changeTheme is called', () => {
    const spy = spyOn(component, 'changeTheme');
    const button = fixture.nativeElement.querySelector('button[mat-fab]');
    button.click();

    expect(spy).toHaveBeenCalled();
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
});
