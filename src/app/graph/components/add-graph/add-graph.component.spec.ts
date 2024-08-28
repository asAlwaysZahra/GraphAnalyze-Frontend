import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGraphComponent } from './add-graph.component';
import { DashboardHeaderComponent } from '../../shared/components/dashboard-header/dashboard-header.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

describe('AddGraphComponent', () => {
  let component: AddGraphComponent;
  let fixture: ComponentFixture<AddGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddGraphComponent,
        DashboardHeaderComponent,
        CardComponent,
      ],
      imports: [MatIconModule, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AddGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
