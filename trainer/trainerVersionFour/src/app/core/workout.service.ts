/**
 * Frameworks dependency
 */
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Http, Response } from "@angular/http";
import { Observable, of, throwError, forkJoin } from "rxjs";
import { catchError, map } from "rxjs/operators";
/**
 * Application dependency
 */
import { WorkoutPlan, ExercisePlan, Exercise } from "./model/workoutModel";
import { CoreModule } from "./core.module";

@Injectable({
  providedIn: CoreModule
})
export class WorkoutService {
  // Class member variable
  workouts: Array<WorkoutPlan> = [];
  exercises: Array<Exercise> = [];
  workout: WorkoutPlan;
  collectionsUrl = "https://api.mlab.com/api/1/databases/training/collections";
  apiKey = "TRZfI48FK_XQeAyB5EE5-7z3d8wFgcgV";
  params = "?apiKey=" + this.apiKey;
  private contactsUrlApi = "/api";
  private contactsUrlPort = "http://localhost:3000";

  constructor(public httpClient: HttpClient) {
    // this.setupInitialExercises();
    // this.setupInitialWorkouts();
  }

  static handleErrorStatuc(error: Response) {
    console.error(error);
    return Observable.throw(error || "Server error");
  }

  private handleErrors(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : "Server error";
    console.error(errMsg); // log to console instead
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

  /**
   * getExercises
   */
  public getExercises(): Promise<Exercise[]> {
    return this.httpClient
      .get<Exercise[]>(
        this.contactsUrlPort + this.contactsUrlApi + "/exercise/create"
      )
      .toPromise()
      .then(res => res)
      .catch(err => {
        return Promise.reject(this.handleError("GetExercise", []));
      });
  }
  public getExercisesByObservable(): Observable<Exercise[]> {
    return this.httpClient
      .get<Exercise[]>(
        this.contactsUrlPort + this.contactsUrlApi + "/exercise/create"
      )
      .pipe(catchError(this.handleError("getExercise", [])));
  }
  // get("/api/contacts")
  public getExercisesByPromisess(): Promise<Exercise[]> {
    return this.httpClient
      .get(this.contactsUrlPort + this.contactsUrlApi + "/exercise/create")
      .toPromise()
      .then(response => response as Exercise[])
      .catch(err => {
        return Promise.reject(this.handleError("GetExercise", []));
      });
  }
  public getExercisesByPromises(): Promise<Exercise[]> {
    return this.httpClient
      .get<Exercise[]>(
        this.contactsUrlPort + this.contactsUrlApi + "/exercise/create"
      )
      .toPromise()
      .then(res => res)
      .catch(err => {
        return Promise.reject(this.handleError("GetExercise", []));
      });
  }

  /**
   * getExercise
   */
  public getExercise(exerciseName: string): Observable<Exercise[]> {
    return this.httpClient
      .get<Exercise[]>(
        this.contactsUrlPort + this.contactsUrlApi + "/exercise/" + exerciseName
      )
      .pipe(catchError(WorkoutService.handleErrorStatuc));
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
   * updateExercise
   */
  public updateExercise(exercise: Exercise) {
    for (let index = 0; index < this.exercises.length; index++) {
      if (this.exercises[index].name === exercise.name) {
        this.exercises[index] = exercise;
      } else {
        return "Update value not found";
      }
    }
    return exercise;
  }
  /**
   * deleteExercise
   */
  public deleteExercise(exerciseName: string) {
    let exerciseIndex: number;
    for (let index = 0; index < this.exercises.length; index++) {
      if (this.exercises[index].name === exerciseName) {
        exerciseIndex = index;
      }
    }
    if (exerciseIndex >= 0) {
      this.exercises.splice(exerciseIndex, 1);
    }
  }

  /**
   * getWorkouts
   */
  public getWorkouts() {
    return this.httpClient
      .get<WorkoutPlan[]>(
        this.contactsUrlPort + this.contactsUrlApi + "/workoutplan/create"
      )
      .pipe(
        map((workouts: Array<any>) => {
          const result: Array<WorkoutPlan> = [];
          if (workouts) {
            workouts.forEach(workout => {
              result.push(
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
          return result;
        }),
        catchError(this.handleError<WorkoutPlan[]>("getWorkouts", []))
      );
  }

  /**
   * getWorkout
   */
  public getWorkoutByName(workoutName: string) {
    return this.httpClient
      .get<WorkoutPlan>(
        this.contactsUrlPort + this.contactsUrlApi + "/workoutplan/" + name
      )
      .pipe(catchError(WorkoutService.handleErrorStatuc));
  }

  /**
   * getWorkoutByForkJoin
   */
  public getWorkoutByForkJoin(workoutName: string): Observable<WorkoutPlan> {
    /**
     * Observable and its forkJoin operator to return two Observable objects
     * one that retrieves the Workout
     * another that retrieves a list of all the Exercises
     */
    return forkJoin(
      this.httpClient.get(
        this.contactsUrlPort + this.contactsUrlApi + "/exercise/create"
      ),
      this.httpClient.get(
        this.contactsUrlPort +
          this.contactsUrlApi +
          "/workoutplan/" +
          workoutName
      )
    ).pipe(
      map((data: any) => {
        const allExercise = data[0];
        const workout = new WorkoutPlan(
          data[1].name,
          data[1].title,
          data[1].restBetweenExercise,
          data[1].exercises,
          data[1].description
        );
        workout.exercises.forEach((exercisePlan: any) => {
          exercisePlan.exercise = allExercise.find(
            (item: any) => item.name === exercisePlan.name
          );
        });
        return workout;
      }),
      catchError(
        this.handleError<WorkoutPlan>(`getWorkout Id = ${workoutName}`)
      )
    );
  }

  /**
   * addWorkout
   */
  public addWorkout(workout: WorkoutPlan) {
    const workoutExercises: any = [];
    workout.exercises.forEach((exercisePlan: any) => {
      workoutExercises.push({
        name: exercisePlan.exercise.name,
        exercise: exercisePlan.exercise._id,
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
      .post(
        this.contactsUrlPort + this.contactsUrlApi + "/workoutplan/create",
        body
      )
      .pipe(catchError(this.handleError<WorkoutPlan>()));
  }
  /**
   * updateWorkout
   */
  public updateWorkout(workout: any) {
    const workoutExercises: any = [];
    workout.exercises.forEach((exercisePlan: any) => {
      workoutExercises.push({
        name: exercisePlan.exercise.name,
        duration: exercisePlan.duration
      });
    });

    const body = {
      _id: workout._id,
      exercises: workoutExercises,
      name: workout.name,
      title: workout.title,
      description: workout.description,
      restBetweenExercise: workout.restBetweenExercise
    };

    return this.httpClient
      .put(this.contactsUrlPort + this.contactsUrlApi + "/workoutplan/", body)
      .pipe(catchError(this.handleError<WorkoutPlan>()));
  }

  /**
   * deleteWorkout
   */
  public deleteWorkout(workoutName: string) {
    return this.httpClient
      .delete(
        this.contactsUrlPort +
          this.contactsUrlApi +
          "/workoutplan/" +
          workoutName
      )
      .pipe(catchError(this.handleError<WorkoutPlan>()));
  }

  private setupInitialExercises() {
    this.exercises.push(
      new Exercise(
        "jumpingJacks",
        "Jumping Jacks",
        "A jumping jack or star jump, also called side-straddle hop is a physical jumping exercise.",
        "JumpingJacks.png",
        "jumpingjacks.wav",
        `Assume an erect position, with feet together and arms at your side. <br>
            Slightly bend your knees, and propel yourself a few inches into the air. <br>
            While in air, bring your legs out to the side about shoulder width or slightly wider. <br>
            As you are moving your legs outward, you should raise your arms up over your head;
            arms should be slightly bent throughout the entire in-air movement. <br>
            Your feet should land shoulder width or wider as your hands meet above your head with arms slightly bent`,
        ["dmYwZH_BNd0", "BABOdJ-2Z6o", "c4DAnQ6DtF8"]
      )
    );

    this.exercises.push(
      new Exercise(
        "wallSit",
        "Wall Sit",
        "A wall sit, also known as a Roman Chair, is an exercise done to strengthen the quadriceps muscles.",
        "wallsit.png",
        "wallsit.wav",
        `Place your back against a wall with your feet shoulder width apart and a little ways out from the wall.
           Then, keeping your back against the wall, lower your hips until your knees form right angles.`,
        ["y-wV4Venusw", "MMV3v4ap4ro"]
      )
    );

    this.exercises.push(
      new Exercise(
        "pushUp",
        "Push up",
        "A push-up is a common exercise performed in a prone position by raising and lowering the body using the arms",
        "Pushup.png",
        "pushups.wav",
        `Lie prone on the ground with hands placed as wide or slightly wider than shoulder width.
           Keeping the body straight, lower body to the ground by bending arms at the elbows.
           Raise body up off the ground by extending the arms.`,
        [
          "Eh00_rniF8E",
          "ZWdBqFLNljc",
          "UwRLWMcOdwI",
          "ynPwl6qyUNM",
          "OicNTT2xzMI"
        ]
      )
    );

    this.exercises.push(
      new Exercise(
        "crunches",
        "Abdominal Crunches",
        "The basic crunch is a abdominal exercise in a strength-training program.",
        "crunches.png",
        "crunches.wav",
        `Lie on your back with your knees bent and feet flat on the floor, hip-width apart.
           Place your hands behind your head so your thumbs are behind your ears.
           Hold your elbows out to the sides but rounded slightly in.
           Gently pull your abdominals inward.
           Curl up and forward so that your head, neck, and shoulder blades lift off the floor.
           Hold for a moment at the top of the movement and then lower slowly back down.`,
        ["Xyd_fa5zoEU", "MKmrqcoCZ-M"]
      )
    );

    this.exercises.push(
      new Exercise(
        "stepUpOntoChair",
        "Step Up Onto Chair",
        "Step exercises are ideal for building muscle in your lower body.",
        "stepUpOntoChair.png",
        "stepup.wav",
        `Position your chair in front of you.
           Stand with your feet about hip width apart, arms at your sides.
           Step up onto the seat with one foot, pressing down while bringing your other foot up next to it.
           Step back with the leading foot and bring the trailing foot down to finish one step-up.`,
        ["aajhW7DD1EA"]
      )
    );

    this.exercises.push(
      new Exercise(
        "squat",
        "Squat",
        "The squat is a compound, full body exercise that trains primarily the muscles of the thighs, hips, buttocks and quads.",
        "squat.png",
        "squats.wav",
        `Stand with your head facing forward and your chest held up and out.
           Place your feet shoulder-width apart or little wider. Extend your hands straight out in front of you.
           Sit back and down like you're sitting into a chair. Keep your head facing straight as your upper body bends
           forward a bit. Rather than allowing your back to round, let your lower back arch slightly as you go down.
           Lower down so your thighs are parallel to the floor, with your knees over your ankles.
           Press your weight back into your heels.
           Keep your body tight, and push through your heels to bring yourself back to the starting position.`,
        ["QKKZ9AGYTi4", "UXJrBgI2RxA"]
      )
    );

    this.exercises.push(
      new Exercise(
        "tricepdips",
        "Tricep Dips On Chair",
        "A body weight exercise that targets triceps.",
        "tricepdips.png",
        "tricepdips.wav",
        `Sit up on a chair. Your legs should be slightly extended, with your feet flat on the floor.
          Place your hands edges of the chair. Your palms should be down, fingertips pointing towards the floor.
          Without moving your legs, bring your glutes forward off the chair.
          Steadily lower yourself. When your elbows form 90 degrees angles, push yourself back up to starting position.`,
        ["tKjcgfu44sI", "jox1rb5krQI"]
      )
    );

    this.exercises.push(
      new Exercise(
        "plank",
        "Plank",
        // tslint:disable-next-line:max-line-length
        "The plank (also called a front hold, hover, or abdominal bridge) is an isometric core strength exercise that involves maintaining a difficult position for extended periods of time.",
        "Plank.png",
        "plank.wav",
        `Get into pushup position on the floor.
           Bend your elbows 90 degrees and rest your weight on your forearms.
           Your elbows should be directly beneath your shoulders, and your body should form a straight line from head to feet.
           Hold this position.`,
        ["pSHjTRCQxIw", "TvxNkmjdhMM"]
      )
    );

    this.exercises.push(
      new Exercise(
        "highKnees",
        "High Knees",
        "A form exercise that develops strength and endurance of the hip flexors and quads and stretches the hip extensors.",
        "highknees.png",
        "highknees.wav",
        `Start standing with feet hip-width apart.
           Do inplace jog with your knees lifting as much as possible towards your chest.`,
        ["OAJ_J3EZkdY", "8opcQdC-V-U"]
      )
    );

    this.exercises.push(
      new Exercise(
        "lunges",
        "Lunges",
        // tslint:disable-next-line:max-line-length
        "Lunges are a good exercise for strengthening, sculpting and building several muscles/muscle groups. including the quadriceps (or thighs), the gluteus maximus (or buttocks) as well as the hamstrings.",
        "lunges.png",
        "lunge.wav",
        `Start standing with feet hip-width apart.
           Do inplace jog with your knees lifting as much as possible towards your chest.`,
        ["Z2n58m2i4jg"]
      )
    );

    this.exercises.push(
      new Exercise(
        "pushupNRotate",
        "Pushup And Rotate",
        "A variation of pushup that requires you to rotate.",
        "pushupNRotate.png",
        "pushupandrotate.wav",
        `Assume the classic pushup position, but as you come up, rotate your body so your right arm lifts up and extends overhead.
           Return to the starting position, lower yourself, then push up and rotate till your left hand points toward the ceiling.`,
        ["qHQ_E-f5278"]
      )
    );

    this.exercises.push(
      new Exercise(
        "sidePlank",
        "Side Plank",
        "A variation to Plank done using one hand only.",
        "sideplank.png",
        "sideplank.wav",
        `Lie on your side, in a straight line from head to feet, resting on your forearm.
           Your elbow should be directly under your shoulder.
           With your abdominals gently contracted, lift your hips off the floor, maintaining the line.
           Keep your hips square and your neck in line with your spine. Hold the position.`,
        ["wqzrb67Dwf8", "_rdfjFSFKMY"]
      )
    );
  }

  private setupInitialWorkouts() {
    const exercises = this.getExercises();
    const workout = new WorkoutPlan("7MinWorkout", "7 Minute Workout", 10, []);
    // practice 22-01-2019
    for (const exercise of this.exercises) {
      workout.exercises.push(new ExercisePlan(exercise, 30));
    }
    this.workouts.push(workout);
    /*
      // practice 22-01-2019
      for (const i in exercises) {
        if (exercises.hasOwnProperty(i)) {
          workout.exercises.push(new ExercisePlan(exercises[i], 30));
        }
      }
    */

    /*
      // practice 22-01-2019
      for (let index = 0; index < exercises.length; index++) {
        const element = exercises[index];
        console.log(element);
        workout.exercises.push(new ExercisePlan(exercises[index], 30));
      }
    */

    /*
      // practice 22-01-2019
      workout.exercises.push(new ExercisePlan(exercises[0], 30));
      workout.exercises.push(new ExercisePlan(exercises[1], 30));
      workout.exercises.push(new ExercisePlan(exercises[2], 30));
      workout.exercises.push(new ExercisePlan(exercises[3], 30));
      workout.exercises.push(new ExercisePlan(exercises[4], 30));
      workout.exercises.push(new ExercisePlan(exercises[5], 30));
      workout.exercises.push(new ExercisePlan(exercises[6], 30));
      workout.exercises.push(new ExercisePlan(exercises[7], 30));
      workout.exercises.push(new ExercisePlan(exercises[8], 30));
      workout.exercises.push(new ExercisePlan(exercises[9], 30));
      workout.exercises.push(new ExercisePlan(exercises[10], 30));
      workout.exercises.push(new ExercisePlan(exercises[11], 30));
    */
  }
}
