import { TestBed } from '@angular/core/testing';

import { LoadGraphService } from './load-graph.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('LoadGraphService', () => {
  let service: LoadGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(LoadGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
