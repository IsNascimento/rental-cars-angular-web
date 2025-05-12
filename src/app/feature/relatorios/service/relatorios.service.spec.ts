import { TestBed } from '@angular/core/testing';

import { AlugueisService } from './relatorios.service';

describe('RelatoriosService', () => {
  let service: AlugueisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlugueisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
