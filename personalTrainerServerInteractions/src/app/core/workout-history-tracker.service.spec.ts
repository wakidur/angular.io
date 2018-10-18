import { TestBed } from '@angular/core/testing';

import { WorkoutHistoryTrackerService } from './workout-history-tracker.service';

describe('WorkoutHistoryTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkoutHistoryTrackerService = TestBed.get(WorkoutHistoryTrackerService);
    expect(service).toBeTruthy();
  });
});
