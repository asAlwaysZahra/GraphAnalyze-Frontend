import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFileComponent } from './assign-file.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardHeaderComponent } from '../../../../shared/components/dashboard-header/dashboard-header.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AssignFileComponent', () => {
  let component: AssignFileComponent;
  let fixture: ComponentFixture<AssignFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AssignFileComponent,
        DashboardHeaderComponent,
        CardComponent,
      ],
      imports: [
        HttpClientModule,
        MatPaginatorModule,
        MatIconModule,
        MatTableModule,
        RouterModule.forRoot([]),
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
