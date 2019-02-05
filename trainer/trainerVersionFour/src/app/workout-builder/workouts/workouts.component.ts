/**
 * Frameworks dependency
 */
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
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
  public notFound = false;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public workoutService: WorkoutService
  ) {}

  ngOnInit() {
    // this.workoutList = this.workoutService.getWorkouts();
    if (
      this.route.snapshot.url[1] &&
      this.route.snapshot.url[1].path === "workout-not-found"
    ) {
      this.notFound = true;
    } else {
      this.workoutService
      .getWorkouts()
      .subscribe(
        workouts => (this.workoutList = workouts),
        (err: any) => console.error
      );
    }
  }

  /**
   * onSelect
   */
  public onSelect(workout: WorkoutPlan) {
    this.router.navigate(["./builder/workout", workout.name]);
  }
}
