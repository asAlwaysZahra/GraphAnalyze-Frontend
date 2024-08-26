import { TestBed } from '@angular/core/testing';

import { AddGraphService } from './add-graph.service';

describe('AddGraphService', () => {
  let service: AddGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
