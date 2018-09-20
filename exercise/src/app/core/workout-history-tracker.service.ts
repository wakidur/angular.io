import { ExercisePlan } from "../workout-runner/model/model";
import { CoreModule } from "./core.module";
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: CoreModule
})
export class WorkoutHistoryTrackerService {
  private maxHistoryItems  = 20; // we only track for last 20 exercise
  private currentWorkoutLog: WorkoutLogEntry = null;
  private workoutHistory: Array<WorkoutLogEntry> = [];
  private workoutTracked: boolean;

  constructor() { }

  get tracking(): boolean {
    return this.workoutTracked;
  }
}

export class WorkoutLogEntry {
  constructor(
    public startedOn: Date,
    public completed: boolean = false,
    public exercisesDone: number = 0,
    public lastExercise?: string,
    public endedOn?: Date) {}
}
