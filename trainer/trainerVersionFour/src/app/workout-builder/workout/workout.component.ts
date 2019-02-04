/**
 * Frameworks dependency
 */
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, ActivationEnd, Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";

/**
 * Application dependency
 *
 */
import { WorkoutPlan, ExercisePlan } from "../../core/model/workoutModel";
import { WorkoutBuilderService } from "../builder-services/workout-builder.service";
import { WorkoutService } from "../../core/workout.service";
@Component({
  selector: "app-workout",
  templateUrl: "./workout.component.html",
  styles: []
})
export class WorkoutComponent implements OnInit, OnDestroy {
  queryParamsSub: Subscription;
  public error: any;
  public workout: WorkoutPlan;
  public sub: any;
  public submitted = false;
  public removeTouched = false;
  private workoutName: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public workoutBuilderService: WorkoutBuilderService,
    public workoutService: WorkoutService
  ) {}

  durations = [
    { title: "15 seconds", value: 15 },
    { title: "30 seconds", value: 30 },
    { title: "45 seconds", value: 45 },
    { title: "1 minute", value: 60 },
    { title: "1 minute 15 seconds", value: 75 },
    { title: "1 minute 30 seconds", value: 90 },
    { title: "1 minute 45 seconds", value: 105 },
    { title: "2 minutes", value: 120 },
    { title: "2 minutes 15 seconds", value: 135 },
    { title: "2 minutes 30 seconds", value: 150 },
    { title: "2 minutes 45 seconds", value: 165 },
    { title: "3 minutes", value: 180 },
    { title: "3 minutes 15 seconds", value: 195 },
    { title: "3 minutes 30 seconds", value: 210 },
    { title: "3 minutes 45 seconds", value: 225 },
    { title: "4 minutes", value: 240 },
    { title: "4 minutes 15 seconds", value: 255 },
    { title: "4 minutes 30 seconds", value: 270 },
    { title: "4 minutes 45 seconds", value: 285 },
    { title: "5 minutes", value: 300 }
  ];

  ngOnInit() {
    this.queryParamsSub = this.route.params.subscribe(
      params => (this.workoutName = params["id"])
    );
    this.sub = this.route.data.subscribe((data: { workout: WorkoutPlan }) => {
      this.workout = data.workout;
    });
  }

  addExercise(exercisePlan: ExercisePlan) {
    this.workoutBuilderService.addExercise(exercisePlan);
  }

  moveExerciseTo(exercisePlan: ExercisePlan, location: any) {
    this.workoutBuilderService.moveExerciseTo(exercisePlan, location);
  }

  removeExercise(exercisePlan: ExercisePlan) {
    this.removeTouched = true;
    this.workoutBuilderService.removeExercise(exercisePlan);
  }

  // save(formWorkout: any): Promise<Object | WorkoutPlan> {
  //   this.submitted = true;
  //   if (!formWorkout.valid) {
  //     return;
  //   }
  //   const savePromise = this.workoutBuilderService.save().toPromise();
  //   savePromise.then(
  //     result => {
  //       this.router.navigate(["/builder/workouts"]);
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   );
  //   return savePromise;
  // }

  save(formWorkout: any): Observable<Object | WorkoutPlan> {
    this.submitted = true;
    if (!formWorkout.valid) {
      return;
    }
    this.workoutBuilderService.save().subscribe(
      success => {
        console.log(success);
        this.router.navigate(["/builder/workouts"]);
      },
      err => console.error(err)
    );
  }

  deleteWorkout(name: string) {
    this.workoutService.deleteWorkout(name).subscribe(
      success => console.log(success),
      (err) => console.error(err));
  }

  cancel(formWorkout: any) {
    this.submitted = false;
    formWorkout.cancel();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}