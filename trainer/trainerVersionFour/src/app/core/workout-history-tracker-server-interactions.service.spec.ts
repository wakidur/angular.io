import { TestBed } from '@angular/core/testing';

import { WorkoutHistoryTrackerServerInteractionsService } from './workout-history-tracker-server-interactions.service';

describe('WorkoutHistoryTrackerServerInteractionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkoutHistoryTrackerServerInteractionsService = TestBed.get(WorkoutHistoryTrackerServerInteractionsService);
    expect(service).toBeTruthy();
  });
});
