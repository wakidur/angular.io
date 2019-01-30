/**
 * Frameworks dependency
 */
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
/**
 * Application dependency
 *
 */
import { WorkoutPlan } from "../../core/model/workoutModel";
import { WorkoutService } from "../../core/workout.service";


@Component({
  selector: "app-workouts",
  templateUrl: "./workouts.component.html",
  styles: []
})
export class WorkoutsComponent implements OnInit {
  // Class member variable
  workoutList: Array<WorkoutPlan> = [];
  constructor(
    public router: Router,
    public workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.workoutList = this.workoutService.getWorkouts();
  }

  /**
   * onSelect
   */
  public onSelect(workout: WorkoutPlan) {
    this.router.navigate(["./builder/workout", workout.name]);
  }
}
