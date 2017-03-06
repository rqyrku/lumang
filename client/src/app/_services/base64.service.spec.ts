import { TestBed, inject } from '@angular/core/testing';

import { Base64Service } from './base64.service';

describe('Base64Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Base64Service]
    });
  });

  it('should ...', inject([Base64Service], (service: Base64Service) => {
    expect(service).toBeTruthy();
  }));
});
