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
        data: { title: "Workouts" }
      },
      {
        path: "workout/new",
        component: WorkoutComponent,
        data: {title: "Create new workout"}
      },
      {
        path: "workout/:id",
        component: WorkoutComponent,
        data: {title: "Workout"}
      },
      {
        path: "exercises",
        component: ExercisesComponent,
        data: {title: "Exercises"}
      },
      {
        path: "exercise/new",
        component: ExerciseComponent,
        data: {title: "Create new exercise"}
      },
      {
        path: "exercise/:id",
        component: ExerciseComponent,
        data: {title: "Exercise"}
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutBuilderRoutingModule {}
