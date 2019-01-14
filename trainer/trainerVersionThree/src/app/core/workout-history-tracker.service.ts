// framework dependencies
import { Injectable } from "@angular/core";

// app dependencies
import { ExercisePlan } from "./model/workoutModel";
import { WorkoutLogEntry } from "./model/workoutLogEntryModel";
// Local Storage Service
import { LocalStorageService } from "./local-storage.service";
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
  private storageKey = "workouts";

  constructor(private storage: LocalStorageService) {
    console.log("WorkoutHistoryTrackerService instance created.");

    this.workoutHistory =
      (storage.getItem<Array<WorkoutLogEntry>>(this.storageKey) || [])
      .map((item: WorkoutLogEntry) => {
        item.startedOn = new Date(item.startedOn.toString());
        item.endedOn = item.endedOn == null ? null : new Date(item.endedOn.toString());
        return item;
      });
  }

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
    this.storage.setItem(this.storageKey, this.workoutHistory);
  }

  /**
   * exerciseComplete
   */
  public exerciseComplete(exercise: ExercisePlan) {
    this.currentWorkoutLog.lastExercise = exercise.exercise.title;
    ++this.currentWorkoutLog.exercisesDone;
    this.storage.setItem(this.storageKey, this.workoutHistory);
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
      this.storage.setItem(this.storageKey, this.workoutHistory);
    } else {
      this.currentWorkoutLog.completed = completed;
      this.currentWorkoutLog.endedOn = new Date();
      this.currentWorkoutLog = null;
      this.workoutTracked = false;
      this.storage.setItem(this.storageKey, this.workoutHistory);
    }
  }

  /**
   * getHistory
   */
  public getHistory(): Array<WorkoutLogEntry> {
    return this.workoutHistory;
  }
}
