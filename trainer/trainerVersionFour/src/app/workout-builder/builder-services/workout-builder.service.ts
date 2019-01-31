/**
 * Frameworks dependency
 */
import { Injectable } from "@angular/core";

/**
 * Application dependency
 */
import { WorkoutPlan, ExercisePlan } from "../../core/model/workoutModel";
import { WorkoutService } from "../../core/workout.service";

/**
 * WorkoutBuilderService will only be used in the Workout Builder feature.
 * Therefore, instead of registering it with the providers in AppModule,
 * we have registered it in the provider array of WorkoutBuilderModule
 */
@Injectable()
export class WorkoutBuilderService {
  // class member variable
  // buildingWorkout: WorkoutPlan;
  buildingWorkout: any;
  newWorkout: boolean;
  firstExercise = true;

  constructor(public workoutService: WorkoutService) {}

  /**
   * startBuilding
   */
  public startBuilding(name: string) {
    if (name) {
      this.buildingWorkout = this.workoutService.getWorkout(name);
      this.newWorkout = false;
    } else {
      const exerciseArray: ExercisePlan[] = [];
      this.buildingWorkout = new WorkoutPlan("", "", 30, []);
      this.newWorkout = true;
    }
    return this.buildingWorkout;
  }

  /**
   * startBuildingNew
   */
  public startBuildingNew() {
    const exerciseArray: ExercisePlan[] = [];
    this.buildingWorkout = new WorkoutPlan("", "", 30, exerciseArray);
    this.newWorkout = true;
    return this.buildingWorkout;
  }

  /**
   * startBuildingNew
   */
  public startBuildingExisting(name: string) {
    this.newWorkout = false;
    return this.workoutService.getWorkout(name);
  }

  /**
   *  removeExercise
   */
  public removeExercise(exercise: ExercisePlan) {
    const currentIndexx = this.buildingWorkout.exercises
      .map(function(e) {
        return e.exercise.name;
      })
      .indexOf(exercise.exercise.name);
    console.log(currentIndexx);
    const currentIndex = this.buildingWorkout.exercises
      .map(e => e.exercise.name)
      .indexOf(exercise.exercise.name);
    this.buildingWorkout.exercises.splice(currentIndex, 1);
  }

  /**
   * addExercise
   */
  public addExercise(exercisePlan: ExercisePlan) {
    if (this.newWorkout && this.firstExercise) {
      this.buildingWorkout.exercises.splice(0, 1);
      this.firstExercise = false;
    }
    this.buildingWorkout.exercises.push(exercisePlan);
  }

  /**
   * moveExerciseTo
   */
  public moveExerciseTo(exercise: ExercisePlan, toIndex: number) {
    if (toIndex < 0 || toIndex >= this.buildingWorkout.exercises.length) {
      return;
    }
    const currentIndex = this.buildingWorkout.exercises.indexOf(exercise);
    this.buildingWorkout.exercises.splice(
      toIndex,
      0,
      this.buildingWorkout.exercises.splice(currentIndex, 1)[0]
    );
  }

  /**
   * save
   */
  public save() {
    const workout = this.newWorkout
      ? this.workoutService.addWorkout(this.buildingWorkout)
      : this.workoutService.updateWorkout(this.buildingWorkout);
    this.newWorkout = false;
    return workout;
  }
}
