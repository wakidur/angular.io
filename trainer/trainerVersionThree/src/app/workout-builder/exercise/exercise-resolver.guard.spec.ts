import { TestBed, async, inject } from '@angular/core/testing';

import { ExerciseResolverGuard } from './exercise-resolver.guard';

describe('ExerciseResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExerciseResolverGuard]
    });
  });

  it('should ...', inject([ExerciseResolverGuard], (guard: ExerciseResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
