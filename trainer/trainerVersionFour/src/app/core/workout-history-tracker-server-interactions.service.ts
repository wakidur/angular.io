/**
 * Frameworks dependency
 */
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Http, Response } from "@angular/http";
import { Observable, of, throwError, forkJoin } from "rxjs";
import { catchError, map } from "rxjs/operators";

/**
 * App dependency
 */
import { CoreModule } from "./core.module";
import { ExercisePlan } from "./model/workoutModel";
import { WorkoutLogEntry } from "./model/workoutLogEntryModel";

@Injectable({
  providedIn: CoreModule
})
export class WorkoutHistoryTrackerServerInteractionsService {
  private maxHistoryItems = 20; // We only track for last 20 exercise
  private currentWorkoutLog: WorkoutLogEntry = null;
  private workoutHistory: Array<WorkoutLogEntry> = [];
  private workoutTracked: boolean;
  private storageKey = "workouts";
  private contactsUrlApi = "/api";
  private contactsUrlPort = "http://localhost:3000";

  constructor(public httpClient: HttpClient) {}

  public getHistoryByObservable(): Observable<WorkoutLogEntry[]> {
    return this.httpClient
      .get<WorkoutLogEntry[]>(
        this.contactsUrlPort + this.contactsUrlApi + "/workoutLogEntry"
      )
      .pipe(
        map((item: Array<any>) => {
          const result: Array<WorkoutLogEntry> = [];
          if (item) {
            item.forEach(value => {
              result.push(
                new WorkoutLogEntry(
                  new Date(value.startedOn.toString()),
                  value.endedOn == null
                    ? null
                    : new Date(value.endedOn.toString()),
                  value.completed,
                  value.exercisesDone,
                  value.lastExercise,
                  value._id
                )
              );
            });
          }
          return result;
        }),
        catchError(this.handleError("getHistoryByObservable", []))
      );
  }


  /**
   * addWorkout
   */
  public addWorkout(workoutLogEntry: WorkoutLogEntry) {
    const body = {
      startedOn: workoutLogEntry.startedOn,
      endedOn: workoutLogEntry.endedOn,
      completed: workoutLogEntry.completed,
      exercisesDone: workoutLogEntry.exercisesDone,
      lastExercise: workoutLogEntry.lastExercise,
    };

    return this.httpClient
      .post(
        this.contactsUrlPort + this.contactsUrlApi + "/workoutLogEntry/create",
        body
      )
      .pipe(map((success) => {
        return success;
      }), catchError(this.handleError<WorkoutLogEntry>()));
  }
  /**
   * updateWorkout
   */
  public updateWorkout(workoutLogEntry: any) {
    const body = {
      _id: workoutLogEntry._id,
      startedOn: workoutLogEntry.startedOn,
      endedOn: workoutLogEntry.endedOn,
      completed: workoutLogEntry.completed,
      exercisesDone: workoutLogEntry.exercisesDone,
      lastExercise: workoutLogEntry.lastExercise,
    };

    return this.httpClient
      .put(this.contactsUrlPort + this.contactsUrlApi + "/workoutLogEntry/", body)
      .pipe(catchError(this.handleError<WorkoutLogEntry>()));
  }


  private handleError<T>(operation = "operation", result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status === 404) {
        console.log("HTTP 404 Not found error");
        return of(result as T);
      } else {
        console.error(error);
        return throwError("An error occurred:", error.error.message);
      }
    };
  }
}
