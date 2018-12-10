import { TestBed, inject } from '@angular/core/testing';

import { BuilderServicesService } from './builder-services.service';

describe('BuilderServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuilderServicesService]
    });
  });

  it('should be created', inject([BuilderServicesService], (service: BuilderServicesService) => {
    expect(service).toBeTruthy();
  }));
});
