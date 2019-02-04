export class WorkoutPlan {
  constructor(
    public id: number,
    public name: string,
    public title: string,
    public restBetweenExercise: number,
    public exercises: ExercisePlan[],
    public description?: string
  ) {}

  totalWorkoutDuration(): number {
    if (!this.exercises) {
      return 0;
    }

    const total = this.exercises
      .map(e => e.duration)
      .reduce((previous, current) => previous + current);

    return (
      (this.restBetweenExercise ? this.restBetweenExercise : 0) *
        (this.exercises.length - 1) +
      total
    );
  }
}

export class ExercisePlan {
  constructor(public id: number, public exercise: Exercise, public duration: number) {}
}

export class Exercise {
  constructor(
    public id: number,
    public name: string,
    public title: string,
    public description: string,
    public image: string,
    public nameSound?: string,
    public procedure?: string,
    public videos?: Array<string>
  ) {}
}