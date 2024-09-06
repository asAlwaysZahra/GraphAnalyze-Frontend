import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileHeaderComponent} from './profile-header.component';
import {CardComponent} from "../../../../../shared/components/card/card.component";

describe('ProfileHeaderComponent', () => {
  let component: ProfileHeaderComponent;
  let fixture: ComponentFixture<ProfileHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileHeaderComponent, CardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
