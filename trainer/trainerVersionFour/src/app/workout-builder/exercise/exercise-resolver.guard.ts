/**
 * Frameworks dependency
 */
import { Injectable } from "@angular/core";
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

/**
 * Application dependency
 */
import { Exercise } from "../../core/model/workoutModel";
import { ExerciseBuilderService } from "../builder-services/exercise-builder.service";

@Injectable()
export class ExerciseResolverGuard implements Resolve<Exercise> {
  public exercise: Exercise;

  constructor(
    private router: Router,
    private exerciseBuilderService: ExerciseBuilderService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Exercise {
    let exerciseName = route.paramMap.get("id");
    const stateName = state.url;
    if (stateName) {
      console.log(stateName);
    } else {
      console.log(stateName);
    }

    if (!exerciseName) {
      exerciseName = "";
    }
    this.exercise = this.exerciseBuilderService.startBuilding(exerciseName);

    if (this.exercise) {
      return this.exercise;
    } else {
      this.router.navigate(["/builder/exercises"]);
      return null;
    }
  }
}
