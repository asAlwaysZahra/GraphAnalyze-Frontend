import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchNodesComponent } from './search-nodes.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchNodesComponent', () => {
  let component: SearchNodesComponent;
  let fixture: ComponentFixture<SearchNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchNodesComponent],
      imports: [
        MatPaginatorModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        NoopAnimationsModule,
      ],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
