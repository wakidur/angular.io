import { TestBed, async, inject } from '@angular/core/testing';

import { WorkoutResolverGuard } from './workout-resolver.guard';

describe('WorkoutResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutResolverGuard]
    });
  });

  it('should ...', inject([WorkoutResolverGuard], (guard: WorkoutResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
