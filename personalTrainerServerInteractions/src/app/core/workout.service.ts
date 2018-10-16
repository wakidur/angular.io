import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { _throw } from "rxjs/observable/throw";
import { of } from "rxjs/observable/of";
import { forkJoin } from "rxjs/observable/forkJoin";
import { map, catchError } from "rxjs/operators";

import { CoreModule } from "./core.module";
import { Exercise, ExercisePlan, WorkoutPlan } from "./model/model";

@Injectable({
  providedIn: CoreModule
})
export class WorkoutService {
  /**
   * GET /databases/{database}/collections
   * Example:
   * https://api.mlab.com/api/1/databases/my-db/collections?apiKey=myAPIKey
   */
  // Variable declaration.
  workouts: Array<WorkoutPlan> = [];
  exercises: Array<Exercise> = [];
  workout: WorkoutPlan;
  collectionsUrl = "https://api.mlab.com/api/1/databases/training/collections";
  apiKey = "TRZfI48FK_XQeAyB5EE5-7z3d8wFgcgV";
  params = "?apiKey=" + this.apiKey;

  constructor(public httpClient: HttpClient) {}

  getExercises(): Observable<Exercise[]> {
    return this.httpClient
      .get<Exercise[]>(this.collectionsUrl + "/exercises" + this.params)
      .pipe(catchError(this.handleError("getExercises", [])));
  }

  /**
   * GetAllExercises
   */
  public getAllExercises(): Observable<Exercise[]> {
    return this.httpClient
      .get<Exercise[]>(this.collectionsUrl + "/exercises" + this.params)
      .pipe(catchError(this.handleError("getAllExercises", [])));
  }

  /**
   * getExerciseByName
   */
  public getExerciseByName(exerciseName: string): Observable<Exercise> {
    return this.httpClient
      .get<Exercise>(
        this.collectionsUrl + "/exercises/" + exerciseName + this.params
      )
      .pipe(
        catchError(this.handleError<Exercise>(`getHero id=${exerciseName}`))
      );
  }

  /**
   * getAllWorkouts()
   */
  public getAllWorkouts(): Observable<WorkoutPlan[]> {
    return this.httpClient
      .get<WorkoutPlan[]>(this.collectionsUrl + "/workouts" + this.params)
      .pipe(
        map((workouts: Array<any>) => {
          const resutl: Array<WorkoutPlan> = [];
          if (workouts) {
            workouts.forEach(workout => {
              resutl.push(
                new WorkoutPlan(
                  workout.name,
                  workout.title,
                  workout.restBetweenExercise,
                  workout.exercises,
                  workout.description
                )
              );
            });
          }
          return resutl;
        }),
        catchError(this.handleError<WorkoutPlan[]>("getWorkouts", []))
      );
  }

  /**
   * getWorkoutByName
   */
  public getWorkoutByName(workoutName: string): Observable<WorkoutPlan> {
    return forkJoin(
      this.httpClient.get(this.collectionsUrl +'/exercises' + this.params)
    )
  }

  // Error handle
  private handleError<T>(operation = "operation", result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status === 404) {
        console.log("HTTP 404 Not found error");
        return of(result as T);
      } else {
        console.error(error);
        return _throw("An error occurred:", error.error.message);
      }
    };
  }
}
