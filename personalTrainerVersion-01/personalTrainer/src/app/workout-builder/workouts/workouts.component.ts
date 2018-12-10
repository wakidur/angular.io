import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { WorkoutPlan } from "../../core/model/model";
import { WorkoutServiceService } from "../../core/workout-service.service";

@Component({
  selector: "app-workouts",
  templateUrl: "./workouts.component.html"
})
export class WorkoutsComponent implements OnInit {
  workoutList: Array<WorkoutPlan> = [];

  constructor(public router: Router, public workoutService: WorkoutServiceService) {}

  ngOnInit() {
    this.workoutList = this.workoutService.getWorkouts();
  }

  onSelect(workout: WorkoutPlan) {
    this.router.navigate(["./builder/workout", workout.name]);
  }
}
