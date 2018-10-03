import { TestBed, inject } from '@angular/core/testing';

import { WorkoutResolverService } from './workout-resolver.service';

describe('WorkoutResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutResolverService]
    });
  });

  it('should be created', inject([WorkoutResolverService], (service: WorkoutResolverService) => {
    expect(service).toBeTruthy();
  }));
});
