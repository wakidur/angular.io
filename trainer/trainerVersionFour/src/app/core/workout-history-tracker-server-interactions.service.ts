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
  private contactsUrlPort = "http://localhost:3000/api";
  // public currentLog: WorkoutLogEntry = null;

  constructor(public httpClient: HttpClient) {}

  public getHistoryByObservable(): Observable<WorkoutLogEntry[]> {
    return this.httpClient
      .get<WorkoutLogEntry[]>(
        this.contactsUrlPort  + "/workoutLogEntry"
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
      lastExercise: workoutLogEntry.lastExercise
    };

    return this.httpClient
      .post(
        this.contactsUrlPort  + "/workoutLogEntry/create",
        body
      )
      .pipe(
        map(success => {
          return success;
        }),
        catchError(this.handleError<WorkoutLogEntry>())
      );
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
      lastExercise: workoutLogEntry.lastExercise
    };

    return this.httpClient
      .put(
        this.contactsUrlPort  + "/workoutLogEntry/",
        body
      )
      .pipe(catchError(this.handleError<WorkoutLogEntry>()));
  }

  // The get tracking() method defines a getter property for workoutTracked in TypeScript.
  get tracking(): boolean {
    return this.workoutTracked;
  }

  /**
   * startTracking
   */
  public startTracking(): Promise<Object | WorkoutLogEntry> {
    this.workoutTracked = true;
    this.currentWorkoutLog = new WorkoutLogEntry(new Date());
    if (this.workoutHistory.length >= this.maxHistoryItems) {
      this.workoutHistory.shift();
    }
    this.workoutHistory.push(this.currentWorkoutLog);
    const postUrl =
      this.contactsUrlPort  + "/workoutLogEntry/create";
    const body = {
      startedOn: this.currentWorkoutLog.startedOn,
      endedOn: this.currentWorkoutLog.endedOn,
      completed: this.currentWorkoutLog.completed,
      exercisesDone: this.currentWorkoutLog.exercisesDone,
      lastExercise: this.currentWorkoutLog.lastExercise
    };
    // return this.httpClient
    //   .post(postUrl, body)
    //   .pipe(map((success: WorkoutLogEntry) => {
    //     this.currentLog = success;
    //   }), catchError(this.handleError<WorkoutLogEntry>()));
    return this.httpClient
      .post<WorkoutLogEntry>(postUrl, body)
      .toPromise()
      .then(response => response as WorkoutLogEntry)
      .catch(this.handleError<WorkoutLogEntry>());
  }

  /**
   * exerciseComplete
   */
  public exerciseComplete(
    exercise: any,
    currentLog
  ): Promise<Object | WorkoutLogEntry> {
    const putUrl =
      this.contactsUrlPort + "/workoutLogEntry/" + currentLog._id;
    this.currentWorkoutLog.lastExercise = exercise.exercise.title;
    ++this.currentWorkoutLog.exercisesDone;
    const body = {
      startedOn: currentLog.startedOn,
      endedOn: this.currentWorkoutLog.endedOn,
      completed: currentLog.completed,
      exercisesDone: this.currentWorkoutLog.exercisesDone,
      lastExercise: this.currentWorkoutLog.lastExercise
    };
    // return this.httpClient.put(putUrl, body).pipe(
    //   map(success => {
    //     return success;
    //   }),
    //   catchError(this.handleError<WorkoutLogEntry>())
    // );
    // put("/api/contacts/:id")

    return this.httpClient
      .put(putUrl, body)
      .toPromise()
      .then(response => response as WorkoutLogEntry)
      .catch(this.handleError<WorkoutLogEntry>());
  }

  /**
   * endTracking
   */
  public endTracking(completed: boolean, currentLog) {
    const putUrl =
      this.contactsUrlPort + "/workoutLogEntry/" +
      currentLog._id;
    if (this.currentWorkoutLog.completed === true) {
      this.currentWorkoutLog.completed = true;
      this.currentWorkoutLog.endedOn = this.currentWorkoutLog.endedOn;
    } else if (completed) {
      this.currentWorkoutLog.completed = completed;
      this.currentWorkoutLog.endedOn = new Date();
      this.workoutTracked = false;

      const body = {
        startedOn: currentLog.startedOn,
        endedOn: this.currentWorkoutLog.endedOn,
        completed: this.currentWorkoutLog.completed,
        exercisesDone: this.currentWorkoutLog.exercisesDone,
        lastExercise: this.currentWorkoutLog.lastExercise
      };
      return this.httpClient
      .put(putUrl, body)
      .toPromise()
      .then(response => response as WorkoutLogEntry)
      .catch(this.handleError<WorkoutLogEntry>());
    } else {
      this.currentWorkoutLog.completed = completed;
      this.currentWorkoutLog.endedOn = new Date();
      this.workoutTracked = false;
      const body = {
        startedOn: this.currentWorkoutLog.startedOn,
        endedOn: this.currentWorkoutLog.endedOn,
        completed: this.currentWorkoutLog.completed,
        exercisesDone: this.currentWorkoutLog.exercisesDone,
        lastExercise: this.currentWorkoutLog.lastExercise
      };
      return this.httpClient
      .put(putUrl, body)
      .toPromise()
      .then(response => {
        this.currentWorkoutLog = null;
        return response;
      })
      .catch(this.handleError<WorkoutLogEntry>());
    }
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
