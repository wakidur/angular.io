import { TestBed } from '@angular/core/testing';

import { ExerciseBuilderService } from './exercise-builder.service';

describe('ExerciseBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExerciseBuilderService = TestBed.get(ExerciseBuilderService);
    expect(service).toBeTruthy();
  });
});
