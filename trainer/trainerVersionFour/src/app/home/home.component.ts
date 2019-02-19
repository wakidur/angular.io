/**
 * Frameworks dependency
 */
import { Component, OnInit } from "@angular/core";

/**
 * Application Components List
 * */
import { WorkoutPlan, Exercise } from "../core/model/workoutModel";
import { WorkoutService } from "../core/workout.service";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: []
})
export class HomeComponent implements OnInit {
  workoutList: Array<WorkoutPlan> = [];
  public exerciseList: Array<Exercise> = [];
  public errorMessage: any;
  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.getExercises().then(
      exerciseList => this.exerciseList = exerciseList,
      error => this.errorMessage = <any>error
    );

    this.workoutList = this.workoutService.getWorkoutsMockData();
  }
}
