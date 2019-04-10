/**
 * Frameworks dependency
 */
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

/**
 * Application Component List
 *
 * WorkoutBuilderComponent
 * WorkoutsComponent
 * WorkoutComponent
 * ExercisesComponent
 * ExerciseComponent
 *
 */
import { WorkoutBuilderComponent } from "./workout-builder.component";
import { WorkoutsComponent } from "./workouts/workouts.component";
import { WorkoutComponent } from "./workout/workout.component";
import { ExercisesComponent } from "./exercises/exercises.component";
import { ExerciseComponent } from "./exercise/exercise.component";

/**
 * Application Service List
 *
 * WorkoutBuilderService
 */
import { WorkoutResolverGuard } from "./workout/workout-resolver.guard";
import { ExerciseResolverGuard } from "./exercise/exercise-resolver.guard";
import { AuthGuard } from "../auth/auth.guard";

// Child Routes
const routes: Routes = [
  {
    path: "",
    component: WorkoutBuilderComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "workouts"
      },
      {
        path: "workouts",
        component: WorkoutsComponent,
        canActivate: [AuthGuard],
        data: { title: "Workouts" }
      },
      {
        path: "workouts/workout-not-found",
        component: WorkoutsComponent,
        data: { title: "Workout not found" }
      },
      {
        path: "workout/new",
        component: WorkoutComponent,
        resolve: { workout: WorkoutResolverGuard },
        data: {title: "Create new workout"}
      },
      {
        path: "workout/:id",
        component: WorkoutComponent,
        resolve: { workout: WorkoutResolverGuard },
        data: {title: "Workout"}
      },
      {
        path: "exercises",
        component: ExercisesComponent,
        canActivate: [AuthGuard],
        data: {title: "Exercises"}
      },
      {
        path: "exercise/new",
        component: ExerciseComponent,
        resolve: {exercise: ExerciseResolverGuard },
        data: {title: "Create new exercise"},
        canActivate: [AuthGuard]
      },
      // {
      //   path: "exercise/:id",
      //   component: ExerciseComponent,
      //   canActivate: [AuthGuard],
      //   resolve: {exercise: ExerciseResolverGuard },
      //   data: {title: "Exercise"}
      // },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutBuilderRoutingModule {}
