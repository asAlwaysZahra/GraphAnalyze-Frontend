import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
