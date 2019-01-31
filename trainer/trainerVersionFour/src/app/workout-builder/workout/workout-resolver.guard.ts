/**
 * Frameworks dependency
 */
import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

/**
 * Application dependency
 *
 */
import { WorkoutPlan } from "../../core/model/workoutModel";
import { WorkoutBuilderService } from "../builder-services/workout-builder.service";

/**
 * The resolve method can return
 * a Promise ,
 * an Observable,
 * or a synchronous value.
 */

@Injectable()
export class WorkoutResolverGuard implements CanActivate, Resolve<WorkoutPlan> {
  workout: WorkoutPlan;
  constructor(
    public router: Router,
    public workoutBuilderService: WorkoutBuilderService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

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
