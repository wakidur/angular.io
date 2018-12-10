import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable ,  throwError as _throw ,  of ,  forkJoin } from "rxjs";
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
   * updateExercise
   */
  public updateExercise(exercise: Exercise) {
    for (let i = 0; i < this.exercises.length; i++) {
      if (this.exercises[i].name === exercise.name) {
        this.exercises[i] = exercise;
      }
    }
    return exercise;
  }

  /**
   * addExercise
   */
  public addExercise(exercise: Exercise) {
    if (exercise.name) {
      this.exercises.push(exercise);
      return exercise;
    }
  }

  /**
   * deleteExercise
   */
  public deleteExercise(exerciseName: string) {
    let exerciseIndex: number;
    for (let i = 0; i < this.exercises.length; i++) {
      if (this.exercises[i].name === exerciseName) {
        exerciseIndex = i;
      }
    }
    if (exerciseIndex >= 0) {
      this.exercises.splice(exerciseIndex, 1);
    }
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
      this.httpClient.get(this.collectionsUrl + "/exercises" + this.params),
      this.httpClient.get(
        this.collectionsUrl + "/workouts/" + workoutName + this.params
      )
    ).pipe(
      map((data: any) => {
        const allExercises = data[0];
        const workout = new WorkoutPlan(
          data[1].name,
          data[1].title,
          data[1].restBetweenExercise,
          data[1].exercises,
          data[1].description
        );
        workout.exercises.forEach(
          (exercisePlan: any) =>
            (exercisePlan.exercise = allExercises.find(
              (x: any) => x.name === exercisePlan.name
            ))
        );
        return workout;
      }),
      catchError(this.handleError<WorkoutPlan>(`getWorkout id=${workoutName}`))
    );
  }

  /**
   * addWorkout
   */
  public addWorkout(workout: WorkoutPlan) {
    // if (workout.name) {
    //   this.workouts.push(workout);
    //   return workout;
    // }
    const workoutExercises: any = [];
    workout.exercises.forEach((exercisePlan: any) => {
      workoutExercises.push({
        name: exercisePlan.exercise.name,
        duration: exercisePlan.duration
      });
    });

    const body = {
      _id: workout.name,
      exercises: workoutExercises,
      name: workout.name,
      title: workout.title,
      description: workout.description,
      restBetweenExercise: workout.restBetweenExercise
    };

    return this.httpClient
      .post(this.collectionsUrl + "/workouts" + this.params, body)
      .pipe(catchError(this.handleError<WorkoutPlan>()));
  }

  /**
   * updateWorkout
   */
  public updateWorkout(workout: WorkoutPlan) {
    // for (let i = 0; i < this.workouts.length; i++) {
    //   if (this.workouts[i].name === workout.name) {
    //     this.workouts[i] = workout;
    //     break;
    //   }
    // }
    const workoutExercises: any = [];
    workout.exercises.forEach((exercisePlan: any) => {
      workoutExercises.push({
        name: exercisePlan.exercise.name,
        duration: exercisePlan.duration
      });
    });

    const body = {
      _id: workout.name,
      exercises: workoutExercises,
      name: workout.name,
      title: workout.title,
      description: workout.description,
      restBetweenExercise: workout.restBetweenExercise
    };

    return this.httpClient
      .put(
        this.collectionsUrl + "/workouts/" + workout.name + this.params,
        body
      )
      .pipe(catchError(this.handleError<WorkoutPlan>()));
  }

  /**
   * name
   */
  public deleteWorkout(workoutName: string) {
    return this.httpClient
      .delete(this.collectionsUrl + "/workouts/" + workoutName + this.params)
      .pipe(catchError(this.handleError<WorkoutPlan>()));
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
