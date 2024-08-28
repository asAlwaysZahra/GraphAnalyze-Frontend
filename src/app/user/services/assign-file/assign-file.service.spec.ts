import { TestBed } from '@angular/core/testing';

import { AssignFileService } from './assign-file.service';

describe('AssignFileService', () => {
  let service: AssignFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
