import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileHeaderComponent} from './profile-header.component';
import {CardComponent} from "../../../../../shared/components/card/card.component";
import {MatIconModule} from "@angular/material/icon";

describe('ProfileHeaderComponent', () => {
  let component: ProfileHeaderComponent;
  let fixture: ComponentFixture<ProfileHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileHeaderComponent, CardComponent],
      imports: [MatIconModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileHeaderComponent);
    component = fixture.componentInstance;

    component.userInfo = {
      firstName: 'Kevin',
      lastName: 'Smith',
      email: 'kevin.smith@example.com',
      phoneNumber: '+123456789'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
