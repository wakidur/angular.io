/**
 * Frameworks dependency
 */
import { Component, OnInit } from "@angular/core";

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
  exerciseList: Array<Exercise> = [];
  constructor(public workoutService: WorkoutService, public workoutBuilderService: WorkoutBuilderService) {}

  ngOnInit() {
    this.workoutService.getExercises()
    .subscribe(
        exercises => this.exerciseList = exercises,
        (err: any) => console.error
    );
  }

  /**
   * addExercise
   */
  public addExercise(exercise: Exercise) {
    this.workoutBuilderService.addExercise(new ExercisePlan(exercise, 30));
  }

}
