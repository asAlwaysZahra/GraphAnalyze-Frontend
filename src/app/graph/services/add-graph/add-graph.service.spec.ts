import { TestBed } from '@angular/core/testing';

import { AddGraphService } from './add-graph.service';
import { HttpClientModule } from '@angular/common/http';

describe('AddGraphService', () => {
  let service: AddGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AddGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
