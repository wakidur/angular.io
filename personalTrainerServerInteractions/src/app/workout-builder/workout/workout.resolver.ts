import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable ,  of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { WorkoutBuilderService } from "../builder-services/workout-builder.service";
import { WorkoutPlan } from "../../core/model/model";

@Injectable()
export class WorkoutResolver implements Resolve<WorkoutPlan> {
  public workout: WorkoutPlan;

  constructor(
    public workoutBuilderService: WorkoutBuilderService,
    public router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<WorkoutPlan> {
    const workoutName = route.paramMap.get("id");

    if (!workoutName) {
      return this.workoutBuilderService.startBuildingNew();
    } else {
      return this.workoutBuilderService.startBuildingExisting(workoutName).pipe(
        map(workout => {
          if (workout) {
            this.workoutBuilderService.buildingWorkout = workout;
            return workout;
          } else {
            this.router.navigate(["/builder/workouts"]);
            return null;
          }
        }),
        catchError(error => {
          console.log("An error occurred!");
          this.router.navigate(["/builder/workouts"]);
          return of(null);
        })
      );
    }
  }
}
