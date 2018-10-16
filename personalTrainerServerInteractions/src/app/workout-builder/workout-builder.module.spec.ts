import { WorkoutBuilderModule } from './workout-builder.module';

describe('WorkoutBuilderModule', () => {
  let workoutBuilderModule: WorkoutBuilderModule;

  beforeEach(() => {
    workoutBuilderModule = new WorkoutBuilderModule();
  });

  it('should create an instance', () => {
    expect(workoutBuilderModule).toBeTruthy();
  });
});
