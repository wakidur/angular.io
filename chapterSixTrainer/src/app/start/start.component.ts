import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { WorkoutPlan } from "../core/model";
import { WorkoutService } from "../core/workout.service";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styles: []
})
export class StartComponent implements OnInit, OnDestroy {
  public isLoader = true;
  public isInputValue = false;
  public workoutList: Array<WorkoutPlan> = [];
  public notFound = false;
  public searchTerm: string;
  private subscription: any;

  constructor(
    private router: Router,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.subscription = this.workoutService.getWorkouts().subscribe(
      workoutList => {
        this.workoutList = workoutList;
        this.isLoader = false;
      },
      (err: any) => console.error(err)
    );
  }

  onSelect(workout: WorkoutPlan) {
    this.router.navigate(["/workout", workout.name]);
  }

  inputFieldChange(searchValude: string) {
    if (searchValude && searchValude.length > 0) {
      this.isInputValue = true;
    } else {
      console.log("nice");
    }
    console.log(`Hello`);
    console.log(`Hello ${searchValude}`);
    console.log(`Hello ${searchValude}`);
  }

  clearInput() {
    this.searchTerm = "";
    this.isInputValue = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
