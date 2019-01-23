import { TestBed } from '@angular/core/testing';

import { WorkoutBuilderService } from './workout-builder.service';

describe('WorkoutBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkoutBuilderService = TestBed.get(WorkoutBuilderService);
    expect(service).toBeTruthy();
  });
});
