import { TestBed } from '@angular/core/testing';

import { LoadGraphService } from './load-graph.service';

describe('LoadGraphService', () => {
  let service: LoadGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
