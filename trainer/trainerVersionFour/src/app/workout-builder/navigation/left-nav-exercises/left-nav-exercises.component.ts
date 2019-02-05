/**
 * Frameworks dependency
 */
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs"; // import Observable from RxJs

/**
 * Application dependency
 */
import { Exercise, ExercisePlan } from "../../../core/model/workoutModel";
import { WorkoutService } from "../../../core/workout.service";
import { WorkoutBuilderService } from "../../builder-services/workout-builder.service";

@Component({
  selector: "app-left-nav-exercises",
  templateUrl: "./left-nav-exercises.component.html",
  styles: []
})
export class LeftNavExercisesComponent implements OnInit {
  public exerciseList: Array<Exercise> = [];
  // Then change exerciseList from an array of exercises to an Observable of the same type
  public exerciseListObservable: Observable<Exercise[]>;
  public errorMessage: any;
  constructor(
    public workoutService: WorkoutService,
    public workoutBuilderService: WorkoutBuilderService
  ) {}

  ngOnInit() {
    /**
     * Using by Observable
     */
    /**
      this.workoutService.getExercises()
      .subscribe(
          exercises => this.exerciseList = exercises,
          (err: any) => console.error
      );

    */
    /**
     *  Using by Promise
     */
    this.workoutService
      .getExercises()
      .then(result => {
        console.log("workout Exercise" + result);
        this.exerciseList = result;
      })
      .catch(err => {
        this.errorMessage = <any>err;
      });

      /**
       * gets the exercises to eliminate the subscription
       */
    this.exerciseListObservable = this.workoutService.getExercisesByObservable();
    console.log("getExercisesByObservable " + this.exerciseListObservable);
  }

  /**
   * addExercise
   */
  public addExercise(exercise: Exercise) {
    this.workoutBuilderService.addExercise(new ExercisePlan(exercise, 30));
  }
}
