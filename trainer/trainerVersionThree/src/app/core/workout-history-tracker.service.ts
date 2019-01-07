// framework dependencies
import { Injectable } from "@angular/core";

// app dependencies
import { ExercisePlan } from "../workout-runner/model/model";
import { WorkoutLogEntry } from "./model/workoutLogEntryModel";
import { CoreModule } from "./core.module";

/**
 * registered WorkoutHistoryTrackerService with Angular's DI framework using the Injectable decorator
 * 	Option 1: Reference the module with the providedIn property
 */
@Injectable({
  providedIn: CoreModule
})
export class WorkoutHistoryTrackerService {
  // class members
  private maxHistoryItems = 20; // tracking last 20 exercise
  private currentWorkoutLog: WorkoutLogEntry = null;
  private workoutHistory: Array<WorkoutLogEntry> = [];
  private workoutTracked: boolean;
  constructor() {}

  // The get tracking() method defines a getter property for workoutTracked in TypeScript.
  get tracking(): boolean {
    return this.workoutTracked;
  }

  /**
   * startTracking
   */
  public startTracking() {
    this.workoutTracked = true;
    this.currentWorkoutLog = new WorkoutLogEntry(new Date());
    if (this.workoutHistory.length >= this.maxHistoryItems) {
      this.workoutHistory.shift();
    }
    this.workoutHistory.push(this.currentWorkoutLog);
  }

  /**
   * exerciseComplete
   */
  public exerciseComplete(exercise: ExercisePlan) {
    this.currentWorkoutLog.lastExercise = exercise.exercise.title;
    ++this.currentWorkoutLog.exercisesDone;
  }

  /**
   * endTracking
   */
  public endTracking(completed: boolean) {
    if (this.currentWorkoutLog.completed === true) {
      this.currentWorkoutLog.completed = true;
      this.currentWorkoutLog.endedOn = this.currentWorkoutLog.endedOn;
    } else if (completed) {
      this.currentWorkoutLog.completed = completed;
      this.currentWorkoutLog.endedOn = new Date();
      this.workoutTracked = false;
    } else {
      this.currentWorkoutLog.completed = completed;
      this.currentWorkoutLog.endedOn = new Date();
      this.currentWorkoutLog = null;
      this.workoutTracked = false;
    }
  }

  /**
   * getHistory
   */
  public getHistory(): Array<WorkoutLogEntry> {
    return this.workoutHistory;
  }
}
