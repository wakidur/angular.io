import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Exercise } from "../../core/model/model";
import { WorkoutServiceService } from "../../core/workout-service.service";

@Component({
  selector: "app-exercises",
  templateUrl: "./exercises.component.html",
  styles: []
})
export class ExercisesComponent implements OnInit {
  exerciseList: Array<Exercise> = [];
  constructor(private router: Router, private workoutService: WorkoutServiceService) {}

  ngOnInit() {
    this.exerciseList = this.workoutService.getExercises();
  }
  onSelect(exercise: Exercise) {
    this.router.navigate(["./builder/exercise", exercise.name]);
  }
}
