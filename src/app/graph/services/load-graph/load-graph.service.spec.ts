import { TestBed } from '@angular/core/testing';

import { LoadGraphService } from './load-graph.service';
import { HttpClientModule } from '@angular/common/http';

describe('LoadGraphService', () => {
  let service: LoadGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(LoadGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
