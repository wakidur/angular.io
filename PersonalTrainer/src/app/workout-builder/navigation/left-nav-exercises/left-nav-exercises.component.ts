import { Component, OnInit } from "@angular/core";

import { WorkoutServiceService } from "../../../core/workout-service.service";
import { Exercise, ExercisePlan } from "../../../core/model/model";
import { WorkoutBuilderService } from "../../builder-services/builder-services.service";

@Component({
  selector: "app-left-nav-exercises",
  templateUrl: "./left-nav-exercises.component.html"
})
export class LeftNavExercisesComponent implements OnInit {
  public exerciseList: Array<Exercise> = [];

  constructor(
    private workoutService: WorkoutServiceService,
    public workoutBuilderService: WorkoutBuilderService
  ) {}

  ngOnInit() {
    this.exerciseList = this.workoutService.getExercises();
}

addExercise(exercise: Exercise) {
  this.workoutBuilderService.addExercise(new ExercisePlan(exercise, 30));
}
}
