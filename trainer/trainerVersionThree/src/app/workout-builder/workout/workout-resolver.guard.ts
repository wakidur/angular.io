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
import { Observable } from "rxjs";

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
  ): WorkoutPlan {
    let workoutName = route.paramMap.get("id");
    if (!workoutName) {
      workoutName = "";
    }

    this.workout = this.workoutBuilderService.startBuilding(workoutName);
    if (this.workout) {
      return this.workout;
    } else {
      this.router.navigate(["/builder/workouts"]);
      return null;
    }
  }


}
