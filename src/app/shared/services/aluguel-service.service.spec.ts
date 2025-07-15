import { TestBed } from '@angular/core/testing';

import { AluguelServiceService } from './aluguel-service.service';

describe('AluguelServiceService', () => {
  let service: AluguelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AluguelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
