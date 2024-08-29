import { TestBed } from '@angular/core/testing';

import { AddGraphService } from './add-graph.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AddGraphService', () => {
  let service: AddGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AddGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
