import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountComponent } from './manage-account.component';
import { DashboardHeaderComponent } from '../../../../shared/components/dashboard-header/dashboard-header.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationStatusComponent } from '../../../../shared/components/validation-status/validation-status.component';

describe('ManageAccountComponent', () => {
  let component: ManageAccountComponent;
  let fixture: ComponentFixture<ManageAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ManageAccountComponent,
        DashboardHeaderComponent,
        CardComponent,
        ValidationStatusComponent,
      ],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule.forRoot([]),
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
