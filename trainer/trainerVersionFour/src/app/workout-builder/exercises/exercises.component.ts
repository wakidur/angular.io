/**
 * Frameworks dependency
 */
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

/**
 * Application dependency
 *
 */
import { Exercise } from "../../core/model/workoutModel";
import { WorkoutService } from "../../core/workout.service";

@Component({
  selector: "app-exercises",
  templateUrl: "./exercises.component.html",
  styles: []
})
export class ExercisesComponent implements OnInit {
  // Class members variable
  exerciseList: Array<Exercise> = [];
  constructor(private router: Router, private workoutService: WorkoutService) {}

  ngOnInit() {
    // this.exerciseList = this.workoutService.getExercises();
    this.workoutService.getExercises().subscribe( exercise => this.exerciseList = exercise, (err: any) => console.error);
  }

  /**
   * onSelect
   */
  public onSelect(exercise: Exercise) {
    this.router.navigate(["./builder/exercise", exercise.name]);
  }

  /**
   * getDynamicClass
   */
  public getDynamicClass(exercise: Exercise) {
    switch (exercise.name) {
      case "jumpingJacks":
        return "list-group-item list-group-item-primary";
        break;
      case "wallSit":
        return "list-group-item list-group-item-success";
        break;
      case "pushUp":
        return "list-group-item list-group-item-secondary";
        break;
      case "crunches":
        return "list-group-item list-group-item-danger";
        break;
      case "stepUpOntoChair":
        return "list-group-item list-group-item-warning";
        break;
      case "squat":
        return "list-group-item list-group-item-info";
        break;
      case "tricepdips":
        return "list-group-item list-group-item-dark";
        break;
      case "plank":
        return "list-group-item list-group-item-light";
        break;
      case "highKnees":
        return "list-group-item list-group-item-dark";
        break;
      case "lunges":
        return "list-group-item list-group-item-warning";
        break;
      case "pushupNRotate":
        return "list-group-item list-group-item-info";
        break;
      case "sidePlank":
        return "list-group-item list-group-item-success";
        break;

      default:
        return "list-group-item";
        break;
    }
  }
}
